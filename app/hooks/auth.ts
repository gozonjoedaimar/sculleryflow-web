import { api_url } from "app/config/api";
import LoginResponseSchema, { LoginResponse } from "app/config/schema/login";
import { commitSession, getSession } from "app/sessions"
import authenticatedAtom from "app/store/authenticated";
import axios from "axios";
import { useAtom } from "jotai";

type AuthReturn = {
    authenticated: boolean|null,
    flash?: { error?: string } | null,
    token?: string|null,
    sessionHeaders: {
        headers: {
            "Set-Cookie": string;
        }
    }
    errors?: { [key:string]: string }
}

/**
 * useAuth
 * 
 * @returns {AuthReturn}
 * - token: string|null
 * - authenticated: boolean
 * - reveal: boolean (whether to reveal the page or not)
 */

export default function useAuth(): Partial<AuthReturn> {
    const [authenticated] = useAtom(authenticatedAtom);
    // TODO: update authenticated atom

    return {
        authenticated
    }
}

export async function checkAuth(request: Request): Promise<AuthReturn> {
    const session = await getSession(request.headers.get("Cookie"));

    let flash = null;

    const flash_error = session.get("error");

    if (flash_error) {
        flash = { error: flash_error };
    }
    
    const sessionString = await commitSession(session);

    return {
        authenticated: !!(await getUserData(session.get("token")?.toString())),
        token: session.get("token"),
        flash,
        sessionHeaders: setSessionHeaders(sessionString)
    }
}

type FormData = {
    email: FormDataEntryValue|string|null,
    password: FormDataEntryValue|string|null
}

type FormErrors = { [key:string]: string, } & Partial<FormData>

function validateForm({ email, password }: FormData): FormErrors {
    const errors: FormErrors = {};
    // validate email
    if (!email) {
        errors.email = "Email is required";
    }
    else if (!`${email}`.includes("@")) {
        errors.email = "Email is invalid";
    }
    // validate password
    if (!password) {
        errors.password = "Password is required";
    }
    else if (`${password}`.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }
    return errors;
}

export async function updateAuth(request: Request): Promise<AuthReturn> {
    const session = await getSession(request.headers.get("Cookie"));
    const form = await request.formData();

    const email = form.get("email");
    const password = form.get("password");

    const errors = validateForm({ email, password });

    if (Object.keys(errors).length > 0) {
        const sessionString = await commitSession(session);
        return {
            authenticated: false, 
            sessionHeaders: setSessionHeaders(sessionString),
            errors
        }
    }

    const response: LoginResponse | Error = await axios.post<LoginResponse>(`${api_url}/auth/login`, {
        email,
        password
    }).then(resp => resp.data).catch( (err: Error) => err );

    const { success } = LoginResponseSchema.safeParse(response);

    let flash_message = null;

    if (response instanceof Error) {
        console.log(response.message);
        flash_message = "Unable to reach server.";
    }
    else if (!success || (!(response instanceof Error) && !response.session)) {
        flash_message = "Email and password do not match.";
    }

    if (flash_message) {
        session.flash("error", flash_message);
        const sessionString = await commitSession(session);
        return {
            authenticated: false, 
            sessionHeaders: setSessionHeaders(sessionString)
        }
    }
    
    if (!(response instanceof Error) && response.session?.access_token) {
        session.set("token", (response.session.access_token));
    }

    const sessionString = await commitSession(session);

    return {
        authenticated: !!(await getUserData(session.get("token")?.toString())),
        sessionHeaders: setSessionHeaders(sessionString)
    }
}

function setSessionHeaders(session: string)
{
    return {
        headers: {
            "Set-Cookie": session
        }
    }
}

// get user data
async function getUserData(token?: string) {
    console.log(token);
    const user = await axios.post<{ user: Record<string, string> }>(`${api_url}/auth/user`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(resp => resp.data.user)
    .catch( e => console.log((e as Error).message) )

    return user;
}
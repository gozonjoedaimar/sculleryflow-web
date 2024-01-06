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
        authenticated: !!session.get("token"),
        token: session.get("token"),
        flash,
        sessionHeaders: setSessionHeaders(sessionString)
    }
}

export async function updateAuth(request: Request): Promise<AuthReturn> {
    const session = await getSession(request.headers.get("Cookie"));
    const form = await request.formData();

    const response: LoginResponse | Error = await axios.post<LoginResponse>(`${api_url}/auth/login`, {
        email: form.get("email"),
        password: form.get("password")
    }).then(resp => resp.data).catch( (err: Error) => err );

    const { success } = LoginResponseSchema.safeParse(response);

    let flash_message = null;

    if (response instanceof Error) {
        console.log(response.message);
        flash_message = "Unable to reach server";
    }
    else if (!success || (!(response instanceof Error) && !response.session)) {
        flash_message = "Invalid credentials";
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
        authenticated: !!session.get("token"),
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
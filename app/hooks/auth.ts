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

    const response = await axios.post<LoginResponse>("http://localhost:8000/auth/login", {
        email: form.get("email"),
        password: form.get("password")
    }).then(resp => resp.data).catch( err => console.log("axios error", err) );

    const { success } = LoginResponseSchema.safeParse(response);

    if (!success || !response || !response.session) {
        session.flash("error", "Invalid credentials");
        const sessionString = await commitSession(session);
        return {
            authenticated: false, 
            sessionHeaders: setSessionHeaders(sessionString)
        }
    }

    session.set("token", response.session.access_token);

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
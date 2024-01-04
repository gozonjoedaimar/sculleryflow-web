import { commitSession, getSession } from "app/sessions"
import authenticatedAtom from "app/store/authenticated";
import { useAtom } from "jotai";

type AuthReturn = {
    authenticated: boolean|null,
    session: string,
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
    
    const sessionString = await commitSession(session);

    return {
        authenticated: !!session.data?.token,
        session: sessionString,
        sessionHeaders: {
            headers: {
                "Set-Cookie": sessionString
            }
        }
    }
}

export async function updateAuth(request: Request): Promise<AuthReturn> {
    const session = await getSession(request.headers.get("Cookie"));

    session.set("token", "some-random-token");

    const sessionString = await commitSession(session);

    return {
        authenticated: !!session.data?.token,
        session: sessionString,
        sessionHeaders: {
            headers: {
                "Set-Cookie": sessionString
            }
        }
    }
}
import { commitSession, getSession } from "app/sessions"
import authenticatedAtom from "app/store/authenticated";
import { useAtom } from "jotai";

type AuthReturn = {
    authenticated: boolean,
    session: string
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

    console.log(session.data);

    return {
        authenticated: !!session.data?.token,
        session: await commitSession(session)
    }
}

export async function updateAuth(request: Request): Promise<AuthReturn> {
    const session = await getSession(request.headers.get("Cookie"));

    session.set("token", "asdfasdfadfasd");

    return {
        authenticated: false,
        session: await commitSession(session)
    }
}
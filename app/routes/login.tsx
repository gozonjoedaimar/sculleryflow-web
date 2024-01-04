import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { checkAuth, updateAuth } from "app/hooks/auth";
import authenticatedAtom from "app/store/authenticated";
import { useAtom } from "jotai";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, sessionHeaders, flash } = await checkAuth(request);

    return json({ authenticated, error: flash?.error }, sessionHeaders);
}

export async function action({ request }: ActionFunctionArgs) {
    const { authenticated, sessionHeaders } = await updateAuth(request);

    return json({ authenticated }, sessionHeaders);
}

export default function Login() 
{
    const { authenticated, error } = useLoaderData<typeof loader>();
    const [ authState, setAuthState ] = useAtom(authenticatedAtom);
    const navigate = useNavigate();

    useEffect(() => {
        setAuthState(authenticated);
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated, setAuthState, navigate]);
    
    return (
        authenticated ? null: 
        <>
            <p>Login</p>
            {error && <p className="text-red-500">{error}</p>}
            <Form method="post">
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <button
                    className="border py-1 px-3 rounded-lg bg-blue-500 text-white"
                    type="submit"
                    >Start</button>
            </Form>
        </>
    );
}
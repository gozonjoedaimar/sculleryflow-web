import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { checkAuth, updateAuth } from "app/hooks/auth";
import authenticatedAtom from "app/store/authenticated";
import { useAtom } from "jotai";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, session } = await checkAuth(request);

    const headers = {
        'Set-Cookie': session
    }

    return json({ authenticated }, { headers });
}

export async function action({ request }: ActionFunctionArgs) {
    const { authenticated, session } = await updateAuth(request);

    console.log(authenticated);

    const headers = {
        'Set-Cookie': session
    }

    return json({ authenticated }, {headers});
}

export default function Login() 
{
    const { authenticated } = useLoaderData<typeof loader>();
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
            <Form method="post">
                <button
                    className="border py-1 px-3 rounded-lg bg-blue-500 text-white"
                    type="submit"
                    >Start</button>
            </Form>
        </>
    );
}
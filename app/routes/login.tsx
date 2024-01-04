import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { checkAuth, updateAuth } from "app/hooks/auth";

export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, session } = await checkAuth(request);

    const headers = {
        'Set-Cookie': session
    }

    if (authenticated) return redirect('/', { headers });

    return json({ authenticated }, { headers });
}

export async function action({ request }: ActionFunctionArgs) {
    const { authenticated, session } = await updateAuth(request);

    console.log(authenticated);

    const headers = {
        'Set-Cookie': session
    }

    if (authenticated) return redirect('/', {headers});
    
    return json({ authenticated }, {headers});
}

export default function Login() 
{
    return (
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
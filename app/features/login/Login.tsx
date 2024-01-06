import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { LoginLoader } from "./loader";
import authenticatedAtom from "app/store/authenticated";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Login() 
{
    const { authenticated, error } = useLoaderData<typeof LoginLoader>();
    const [ authState, setAuthState ] = useAtom(authenticatedAtom);
    const navigate = useNavigate();

    useEffect(() => {
        setAuthState(authenticated);
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated, setAuthState, navigate]);
    
    return (
        authenticated || authenticated === null ? null: 
        <div className="login-form">
            <p>Sign in to Sculleryflow</p>
            {error && <p className="notif alert">{error}</p>}
            <Form method="post" className="flex flex-col mt-2 gap-2">
                <input type="email" name="email" placeholder="E-mail" />
                <input type="password" name="password" placeholder="Password" />
                <button
                    className="btn-primary"
                    type="submit"
                    >Start</button>
            </Form>
        </div>
    );
}
import { Form, useActionData, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { LoginLoader } from "./loader";
import authenticatedAtom from "app/store/authenticated";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import banner from './login-banner.jpg';

type ActionFormData = {
    errors: {
        email: string,
        password: string
    }
}

export default function Login() 
{
    const { authenticated, error } = useLoaderData<typeof LoginLoader>();
    const actionData = useActionData() as ActionFormData | undefined;
    const [ authState, setAuthState ] = useAtom(authenticatedAtom);
    const navigate = useNavigate();
    const navigation = useNavigation();
    const email = useRef<HTMLInputElement>(null);
    const [email_value, setEmail] = useState<string>();

    useEffect(() => {
        setAuthState(authenticated);
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated, setAuthState, navigate]);
    
    return (
        authenticated || authenticated === null ? null: 
        <div className="h-full flex items-center justify-center">
            <div className="login-form flex flex-row justify-between items-center rounded-3xl overflow-hidden bg-blue-50">
                <Form method="post" className="flex flex-col w-[500px] px-16">
                    <h1 className="text-3xl">Sign in to Sculleryflow</h1>
                    <p className="italic text-teal-600">Manage kitchen inventory like never before.</p>
                    {error && <p className="notif alert">{error}</p>}
                    <div className="input-group mt-8">
                        <label htmlFor="email" className="text-lg">E-mail</label>
                        <input type="email" name="email" id="email" ref={email} onChange={ e => setEmail(e.target.value) } className="large-input" />
                        { email?.current?.validationMessage && <p className="input-error text-sm text-red-600 italic">{email.current.validationMessage}</p> }
                        {actionData?.errors?.email && <p className="input-error text-sm text-red-600 italic">{actionData.errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="text-lg">Password</label>
                        <input type="password" name="password" id="password" className="large-input" />
                        {actionData?.errors?.password && <p className="input-error text-sm text-red-600 italic">{actionData.errors.password}</p>}
                    </div>
                    <button
                        className="btn-primary large-btn mt-4"
                        type="submit"
                        disabled={navigation.state === 'submitting'}
                        >Login</button>
                </Form>
                <div className="login-banner w-72">
                    <img src={banner} alt="Login Banner" />
                </div>
            </div>
        </div>
    );
}
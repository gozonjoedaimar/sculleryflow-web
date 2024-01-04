import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { checkAuth } from "app/hooks/auth";

export async function loader({request}:LoaderFunctionArgs) {
    const { authenticated, sessionHeaders } = await checkAuth(request);

    if (!authenticated) return redirect('/login', sessionHeaders);

    return json({ authenticated }, sessionHeaders)
}

export default function Index() {
    return (
        <>
            <p>Sculleryflow App Dashboard</p>
            <Link to="/menu" className="border py-1 px-2 bg-gray-400">Menu</Link>
            <Form method="post" action="/logout">
                <button
                    className="border py-1 px-3 rounded-lg bg-blue-500 text-white"
                    type="submit"
                >
                    Logout
                </button>
            </Form>
        </>
    );
}
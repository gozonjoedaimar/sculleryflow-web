import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { checkAuth } from "app/hooks/auth";

export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, session } = await checkAuth(request);

    const headers = {
        'Set-Cookie': session
    }

    if (!authenticated) return redirect('/login', { headers });

    return json({ authenticated }, { headers })
}

export default function Menu() {
    return (
        <>
            <p>Menu</p>
            <Link to="/" className="border py-1 px-2 bg-gray-400">Home</Link>
        </>
    );
}
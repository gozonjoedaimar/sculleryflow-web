import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { checkAuth } from "app/hooks/auth";

export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, sessionHeaders } = await checkAuth(request);

    if (!authenticated) return redirect('/login', sessionHeaders);

    return json({ authenticated }, sessionHeaders)
}

export default function Menu() {
    return (
        <>
            <p>Menu</p>
            <Link to="/menu/item" className="border py-1 px-2 bg-gray-400">sub item</Link>
            <Link to="/" className="border py-1 px-2 bg-gray-400">Home</Link>
        </>
    );
}
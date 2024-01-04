import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { checkAuth } from "app/hooks/auth";

export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated } = await checkAuth(request);
    if (!authenticated) return redirect('/login');
    return json({ authenticated });
}

export default function MenuItem()
{
    return (
        <>
        <p>Menu Item</p>
        <Link to ="/menu" className="px-2 py-1 border bg-gray-300">
            Parent
        </Link>
        </>
    );
}
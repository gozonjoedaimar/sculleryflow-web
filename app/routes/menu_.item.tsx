import { Link } from "@remix-run/react";

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
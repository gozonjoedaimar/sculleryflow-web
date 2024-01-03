import { Link } from "@remix-run/react";

export default function Menu() {
    return (
        <>
            <p>Menu</p>
            <Link to="/" className="border py-1 px-2 bg-gray-400">Home</Link>
        </>
    );
}
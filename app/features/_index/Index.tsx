import { Form, Link } from "@remix-run/react";

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
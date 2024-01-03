import { Link, useNavigate } from "@remix-run/react";
import tokenAtom from "app/store/token";
import { useAtom } from "jotai";

export default function Index() {
    const [token, setToken] = useAtom(tokenAtom);
    const navigate = useNavigate();
    return (
        <>
            <p>Sculleryflow App Dashboard</p>
            <Link to="/menu" className="border py-1 px-2 bg-gray-400">Menu</Link>
            <button
                className="border py-1 px-3 rounded-lg bg-blue-500 text-white"
                type="button"
                onClick={() => setToken(null)}
            >
                Logout
            </button>
        </>
    );
}
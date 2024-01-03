import tokenAtom from "app/store/token";
import { useAtom } from "jotai";

export default function Login() 
{
    const [token, setToken] = useAtom(tokenAtom);


    return (
        <>
            <p>Login</p>
            <button
                className="border py-1 px-3 rounded-lg bg-blue-500 text-white"
                type="button"
                onClick={() => setToken("12123")}
                >Start</button>
        </>
    );
}
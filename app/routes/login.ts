import { ActionFunctionArgs, json } from "@remix-run/node";
import Login from "app/features/login/Login";
import { LoginLoader } from "app/features/login/loader";
import {  updateAuth } from "app/hooks/auth";

export const loader = LoginLoader;

export async function action({ request }: ActionFunctionArgs) {
    const { authenticated, sessionHeaders } = await updateAuth(request);

    return json({ authenticated }, sessionHeaders);
}

export default Login;
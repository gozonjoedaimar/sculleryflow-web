import { ActionFunctionArgs, json } from "@remix-run/node";
import Login from "app/features/login/Login";
import { LoginLoader } from "app/features/login/loader";
import {  updateAuth } from "app/hooks/auth";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = LoginLoader;

export const meta = useTitleMeta();

export async function action({ request }: ActionFunctionArgs) {
    const { authenticated, sessionHeaders, errors } = await updateAuth(request);

    return json({ authenticated, errors }, sessionHeaders);
}

export default Login;
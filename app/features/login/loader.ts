import { LoaderFunctionArgs, json } from "@remix-run/node";
import { checkAuth } from "app/hooks/auth";

export async function LoginLoader({ request }: LoaderFunctionArgs) {
	const { authenticated, sessionHeaders, flash } = await checkAuth(request);

	return json({ authenticated, error: flash?.error }, sessionHeaders);
}
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { checkAuth } from "app/hooks/auth";

export default async function AuthLoader({ request }: LoaderFunctionArgs) {
	const { authenticated } = await checkAuth(request);
	if (!authenticated) return redirect("/login");
	return json({ authenticated });
}
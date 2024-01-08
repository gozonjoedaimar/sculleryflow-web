import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { checkAuth } from "app/hooks/auth";

export default async function IndexLoader({ request }: LoaderFunctionArgs) {
	const { authenticated, sessionHeaders } = await checkAuth(request);

	if (!authenticated) return redirect("/login", sessionHeaders);

	return json({ 
		title: "Dashboard",
		authenticated
	}, sessionHeaders);
}
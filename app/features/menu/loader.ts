import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { checkAuth } from "app/hooks/auth";
import axios from "axios";

type MenuData = {
	menu: {
		_id: string;
		name: string;
	}[];
};

export default async function MenuLoader({ request }: LoaderFunctionArgs) {
	const { authenticated, sessionHeaders, token } = await checkAuth(request);

	if (!authenticated) return redirect("/login", sessionHeaders);

	// fetch menu items
	const menu = await getMenu({ token });

	return json({ authenticated, menu }, sessionHeaders);
}

async function getMenu({ token }: { token?: string|null; })
{
	// fetch menu items
	const menu = await axios
		.get<MenuData>("http://localhost:8000/api/inventory/kitchen/menu", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((resp) => resp.data?.menu)
		.catch((e) => console.log("fetch menu err:", e));

    return menu;
}
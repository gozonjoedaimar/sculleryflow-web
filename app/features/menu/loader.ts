import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { checkAuth } from "app/hooks/auth";
import { api_url } from 'app/config/api';
import HttpClient from "app/helpers/ApiClient";

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
	const menu = await getMenu();

	return json({
		title: "Menu",
		authenticated, menu,
		screen_title: "Manage Menu",
	}, sessionHeaders);
}

async function getMenu()
{
	// fetch menu items
	const menu = await HttpClient
		.get<MenuData>(`${api_url}/api/menu`)
		.then((resp) => resp.data?.menu)
		.catch((e: Error) => console.log("fetch menu err:", e.message));

    return menu;
}
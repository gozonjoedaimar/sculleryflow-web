import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";
import { checkAuth } from "app/hooks/auth";
import { AxiosError } from "axios";

type IngredientsData = {
	items?: {
		_id: string;
		name: string;
	}[];
};

export default async function handler ({ request }: LoaderFunctionArgs) {
    const { authenticated } = await checkAuth(request);

    if (!authenticated) {
        return redirect("/login");
    }

    const data = await HttpClient.get<IngredientsData>(`${api_url}/api/inventory/item`).then( resp => resp.data ).catch( e => e );

    if (data instanceof AxiosError) {
        return json({
            error: data.message,
        });
    }

    return json(data);
}
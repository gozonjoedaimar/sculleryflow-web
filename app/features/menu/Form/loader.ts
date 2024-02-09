import { LoaderFunctionArgs, json } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";

type Params = {
    item_id?: string;
}

type MenuData = {
    _id: string;
    name: string;
    items: {
        _id: string;
        name: string;
    }[],
    procedure: {
        step: string;
    }[];
}

export default async function (data: LoaderFunctionArgs) {
    const { item_id } = data.params as Params;
    const query = await HttpClient.get(`${api_url}/api/menu/${item_id}`).then( res => res.data ).catch( e => console.log((e as Error).message) ) || {};

    console.log(query);

    const menu: MenuData = {
        _id: query._id,
        name: query.name,
        procedure: (query.procedure || []) as MenuData['procedure'],
        items: (query.items || []) as MenuData['items']
    }

    return json({ id: item_id, menu });
}
import { LoaderFunctionArgs } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";

type RequestParam = {
    item_id: string
}

type MenuItemData = {
    _id?: string;
    name: string;
    items: {
        _id?: string,
        name: string
    }[],
    procedure: {
        step: string
    }[]
}

export default async function MenuItemLoader({ params }: LoaderFunctionArgs)
{
    const { item_id } = params as RequestParam;

    const { name, items, procedure } = (await getMenuItem(item_id)) || {};

    return {
        title: `${name || item_id}`,
        prefix: "Menu",
        item_id,
        name: name || undefined,
        items: items || [],
        procedure: procedure || []
    };
}

type MenuItem = {
    _id: string;
    name: string;
}

async function getMenuItem(item_id: string): Promise<MenuItemData|null>
{
    const menuItem = await HttpClient.get<MenuItemData>(`${api_url}/api/menu/${item_id}`)
        .then( res => res.data ).catch( (e) => console.log(e.message) );

    return menuItem || null;
}
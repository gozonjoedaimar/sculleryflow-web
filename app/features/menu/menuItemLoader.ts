import { LoaderFunctionArgs } from "@remix-run/node";
import { api_url } from "app/config/api";
import axios from "axios";

type RequestParam = {
    item_id: string
}

export default async function MenuItemLoader({ params }: LoaderFunctionArgs)
{
    const { item_id } = params as RequestParam;

    const menuItem = await getMenuItem(item_id);

    return {
        title: `${menuItem?.name || item_id} / Menu`,
        item_id,
        name: menuItem?.name || undefined
    };
}

type MenuItem = {
    _id: string;
    name: string;
}

async function getMenuItem(item_id: string)
{
    const menuItem = axios.get<MenuItem>(`${api_url}/api/inventory/kitchen/menu/${item_id}`)
        .then( res => res.data ).catch( (e) => console.log(e.message) );

    return menuItem;
}
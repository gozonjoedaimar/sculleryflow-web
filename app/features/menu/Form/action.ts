// menu/item/form/action.ts
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";

type actionArgs = ActionFunctionArgs & { params: {item_id: string} }

export default async function action({ params, request }: actionArgs) {
    // check if item_id is in params
    if (!('item_id' in params)) {
        return json({
            error: 'Invalid request.'
        })
    }
    
    // check if item exists
    const itemExists = !!(await getMenu(params.item_id));
    if (!itemExists) {
        return json({
            error: 'Failed to fetch data.'
        });
    }

    // get form data
    const body = await request.formData();

    const savedItem = await saveItem({
        item_data: params.item_id,
        name: body.get('name') as string || ''
    });

    if (!savedItem) {
        return json({
            error: 'Failed to save item.'
        });
    }

    return redirect(`../${params.item_id}`);
}

async function getMenu(item_id: string)
{
    const query = await HttpClient.get(`${api_url}/api/menu/${item_id}`).then( res => res.data ).catch( e => console.log((e as Error).message) ) || {};
    if ('_id' in query) {
        return  query;
    }
    return null;
}

type ItemData = {
    item_data: string;
    name: string;
}

async function saveItem({ item_data, name }: ItemData) {
    const query = await HttpClient.post<{ item: { _id: string; } }>(`${api_url}/api/menu/edit/${item_data}`, { name }).then( res => res.data ).catch( e => console.log((e as Error).message) ) || {};

    if ('item' in query) {
        return query;
    }

    return null;
}
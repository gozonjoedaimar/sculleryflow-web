// menu/item/form/action.ts
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";

type actionArgs = ActionFunctionArgs & { params: {item_id: string} }

export default async function action({request, params}: actionArgs) {
    switch (request.method) {
        case 'POST':
            return post({request, params} as actionArgs);
        case 'DELETE':
            return deleteMenuItem(params.item_id);
        default:
            return json({
                error: 'Invalid request method.'
            });
    }
}

async function post({ params, request }: actionArgs) {
    // get form data
    const body = await request.formData();

    const is_new = body.get('_action') === 'new';
    
    // check if item_id is in params
    if (!is_new && !('item_id' in params)) {
        return json({
            error: 'Invalid request.'
        })
    }
    
    // check if item exists
    if (!is_new) {
        const itemExists = !!(await getMenu(params.item_id));
        if (!itemExists) {
            return json({
                error: 'Failed to fetch data.'
            });
        }
    }

    const procedure = body.getAll('step[]') as string[];
    const items = body.getAll("ingredients[]") as string[];

    const savedItem = await saveItem({
        is_new,
        item_id: params.item_id,
        name: body.get('name') as string || '',
        procedure: procedure.filter( step => `${step}`.trim() ),
        items
    });

    if (!savedItem) {
        return json({
            error: 'Failed to save item.'
        });
    }

    let id = params?.item_id;

    if ('menu' in savedItem) {
        id = savedItem.menu.id;
    }

    return redirect( `../${id}`);
}

/**
 * Delete Menu Item
 * @param item_id 
 * @returns json
 */
async function deleteMenuItem(item_id: string) {
    const deletedItem = await deleteItem(item_id);

    if (!deletedItem) {
        return json({
            error: 'Failed to delete item.'
        });
    }

    return redirect('../');
}

async function getMenu(item_id: string)
{
    const query = await HttpClient.get<{ _id: string; }>(`${api_url}/api/menu/${item_id}`).then( res => res.data ).catch( e => console.log((e as Error).message) ) || {};
    if ('_id' in query) {
        return  query;
    }
    return null;
}

type ItemData = {
    item_id: string;
    name: string;
    is_new: boolean;
    procedure?: string[];
    items?:string[];
}

async function saveItem({ item_id, name, is_new, procedure, items }: ItemData) {
    let query = null;
    
    if (is_new) {
        query = await HttpClient.post<{ menu: { id: string; } }>(`${api_url}/api/menu/add`, { name, procedure, items }).then( res => res.data ).catch( e => console.log((e as Error).message) ) || {};
    }
    else {
        query = await HttpClient.post<{ item: { _id: string; } }>(`${api_url}/api/menu/edit/${item_id}`, { name, procedure, items }).then( res => res.data ).catch( e => console.log((e as Error).message) ) || {};
    }

    if ('item' in query || 'menu' in query) {
        return query;
    }

    return null;
}

async function deleteItem(item_id: string) {
    const query = await HttpClient.delete<{ item: { _id: string; name: string; } }>(`${api_url}/api/menu/delete/${item_id}`).then( res => res.data ).catch( e => console.log((e as Error).message) ) || {};

    if ('item' in query) {
        return query;
    }

    return null;
}
import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";
import { checkAuth } from "app/hooks/auth";

const api = (id: string) => `${api_url}/api/order/${id}`;
const menuapi = (id: string) => `${api_url}/api/menu/${id}`;

type LoaderData = {
    id: string;
    items: string[];
    error?: string;
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const { authenticated } = await checkAuth(request);
    if (!authenticated) return json({ error: "Unauthorized", id: null }, { status: 400 });

    const id = params.id as string;

    const item_ids = await HttpClient.get<{ order: { items: string[] } }>(api(id)).then(res => res.data?.order.items || []).catch(e => console.log(e.message)) || [];

    const query = [] as Promise<string>[];

    item_ids.map(id => {
        const item = HttpClient.get<{ name: string; }>(menuapi(id)).then(res => res.data?.name || "")
        query.push(item)
    });

    const items = await Promise.all(query);

    return json({
        id,
        items
    });
}

export default function OrderView() {
    const { id, items, error } = useLoaderData() as LoaderData;
    return (
        error ? <p>{error}</p> :
            <>
                <h3 className="mb-4 text-lg">Order-{id ? id.substring(0, 8) : 'NULL'} (WIP)</h3>
                <ul>
                    <li>Order items:</li>
                    {!items.length && <li className="mb-4">No item added</li>}
                    {items.map(item => <li className="text-slate-500">{item}</li>)}
                </ul>
            </>
    )
}

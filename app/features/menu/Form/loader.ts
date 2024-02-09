import { LoaderFunctionArgs, json } from "@remix-run/node";

type Params = {
    item_id?: string;
}

export default async function (data: LoaderFunctionArgs) {
    const { item_id } = data.params as Params;
    return json({ id: item_id });
}
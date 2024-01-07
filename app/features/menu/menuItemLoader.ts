import { LoaderFunctionArgs } from "@remix-run/node";

type RequestParam = {
    item_id: string
}

export default async function MenuItemLoader({ params }: LoaderFunctionArgs)
{
    const { item_id } = params as RequestParam;

    return { item_id };
}
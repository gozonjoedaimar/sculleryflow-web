import { useLoaderData } from "@remix-run/react";
import MenuItemLoader from "./menuItemLoader";

export default function MenuItem() {
    const { item_id, name } = useLoaderData<typeof MenuItemLoader>();
    return (
        <p>Menu Item: {name || item_id}</p>
    );
}
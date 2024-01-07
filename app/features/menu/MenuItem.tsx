import { useLoaderData } from "@remix-run/react";
import MenuItemLoader from "./menuItemLoader";

export default function MenuItem() {
    const { item_id } = useLoaderData<typeof MenuItemLoader>();
    return (
        <p>Menu Item: {item_id}</p>
    );
}
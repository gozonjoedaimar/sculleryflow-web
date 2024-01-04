import { Link, useLoaderData } from "@remix-run/react";
import MenuLoader from "app/features/menu/loader";

export const loader = MenuLoader;

export default function Menu() {
    const { menu } = useLoaderData<typeof loader>();
    return (
        <>
            <p>Menu</p>
            { menu?.map( item => <p key={item._id}>{ item.name }</p> ) }
            <Link to="/menu/item" className="border py-1 px-2 bg-gray-400">sub item</Link>
            <Link to="/" className="border py-1 px-2 bg-gray-400">Home</Link>
        </>
    );
}
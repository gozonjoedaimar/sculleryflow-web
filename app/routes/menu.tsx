import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { checkAuth } from "app/hooks/auth";
import axios from "axios";

type MenuData = {
    menu: {
        _id: string;
        name: string;
    }[]
}

export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, sessionHeaders, token } = await checkAuth(request);

    if (!authenticated) return redirect('/login', sessionHeaders);

    // fetch menu items
    const menu = await axios.get<MenuData>("http://localhost:8000/api/inventory/kitchen/menu", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then( resp => resp.data?.menu ).catch(e => console.log("fetch menu err:", e));

    return json({ authenticated, menu }, sessionHeaders)
}

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
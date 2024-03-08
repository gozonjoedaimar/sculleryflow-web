import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";
import { checkAuth } from "app/hooks/auth";

const apiPath = api_url + "/api/orders";

type Order = {
    message: string;
    orders: {
        _id: string;
        items: string[]; // item ids
    }[]
}

const Loader = async ({ request }: LoaderFunctionArgs) => {
    const { authenticated } = await checkAuth(request);

    if (!authenticated) return redirect("/login");

    const orderApi = await HttpClient.get<Order>(apiPath).then((resp) => resp.data).catch((e: Error) => console.log("fetch orders err:", e.message));

    const orders = !!orderApi!?.orders && orderApi.orders.length ? orderApi.orders : [];

    return json({
        title: "Orders",
        screen_title: "Review Orders",
        orders: orders.map((order) => ({
            id: order._id,
            items: order.items
        }))
    });
}

export default Loader;

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";
import { checkAuth } from "app/hooks/auth";

const api = `${api_url}/api/dashboard/best-seller`;

type TRBestSeller = {
    total_orders: number;
    menus: {
        count: number;
        name: string;
    }[]
};

export const loader = async ({request}:LoaderFunctionArgs) => {
    const {authenticated} = await checkAuth(request);
    if (!authenticated) return json({error: "Unauthorized"}, {status: 401});
    const data: TRBestSeller = await HttpClient.get<TRBestSeller>(api).then((resp) => resp.data).catch((e: Error) => console.log("fetch best seller err:", e.message)) || {} as TRBestSeller;
    return json({
        api: "best-seller",
        data: data.menus,
        total_orders: data.total_orders,
    });
};
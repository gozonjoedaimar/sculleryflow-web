import { LoaderFunctionArgs, json } from "@remix-run/node";
import { api_url } from "app/config/api";
import HttpClient from "app/helpers/ApiClient";
import { checkAuth } from "app/hooks/auth";

const api = `${api_url}/api/dashboard/most-used`;

type TRMostUsed = {
    items: {
        count: number;
        name: string;
    }[],
    total_used: number;
}

export const loader = async ({request}:LoaderFunctionArgs) => {
    const {authenticated} = await checkAuth(request);
    if (!authenticated) return json({error: "Unauthorized"}, {status: 401});
    const data = await HttpClient.get<TRMostUsed>(api).then((resp) => resp.data).catch((e: Error) => console.log("fetch most used err:", e.message)) || {} as TRMostUsed;
    return json({
        api: "most-used",
        data: data.items,
        total_used: data.total_used
    });
};
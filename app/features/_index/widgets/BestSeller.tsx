import axios from "axios";
import PercentageCircle from "./components/percentageCircle";
import Widget from "./widget";
import { useEffect, useState } from "react";

type LowInventoryProps = {
    title?: string;
    item_name?: string; // for demo purposes
};

type OrderData = {
    count: number;
    name: string;
};

type TROrders = {
    total_orders: number;
    data: OrderData[];
};

export default function BestSeller({
    title = "Best Seller",
    item_name = "Menu",
}: LowInventoryProps) {
    const [data, setData] = useState<TROrders>();
    const [items, setItems] = useState<OrderData[]>([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        // axios signal
        const source = axios.CancelToken.source();
        setFetching(true);
        axios
            .get<TROrders>("/api/dashboard/best-seller", {
                cancelToken: source.token,
            })
            .then((resp) => {
                setData(resp.data);
                setFetching(false);
            })
            .catch((e: Error) =>
                console.log("fetch best seller err:", e.message),
            );
        return () => {
            source.cancel("Best Seller widget unmounted");
        };
    }, []);

    useEffect(() => {
        if (data?.data) {
            setItems(data.data);
        }
    }, [data]);

    return (
        <Widget title={title}>
            <div className="low-inventory-widget px-4 ">
                { !items.length && <div className="text-center text-slate-400">{ fetching ? "Fetching data": "No data"}</div>}
                <table className="w-full bg-white">
                    <tbody>
                        {items.map((i) => {
                            const percentage = data?.total_orders
                                ? (i.count / data?.total_orders) * 100
                                : 0;
                            return (
                                <tr
                                    key={`${item_name}${i.name}`}
                                    className="border"
                                >
                                    <td className="px-4 py-2">
                                        <span>{i.name}</span>
                                        <span className="ml-1 text-xs text-slate-400">({i.count})</span>
                                    </td>
                                    <td className="flex justify-end px-4 py-2">
                                        <PercentageCircle
                                            percentage={percentage}
                                            title={`${i.count}/${data?.total_orders}`}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Widget>
    );
}

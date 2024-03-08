import axios from "axios";
import PercentageCircle from "./components/percentageCircle";
import Widget from "./widget";
import { useEffect, useState } from "react";

type LowInventoryProps = {
    title?: string;
    item_name?: string; // for demo purposes
};

type UsedData = {
    count: number;
    name: string;
};

type TRUsed = {
    total_used: number;
    data: UsedData[];
};

export default function MostUsed({
    title = "Most Used",
    item_name = "Item",
}: LowInventoryProps) {
    const [data, setData] = useState<TRUsed>();
    const [items, setItems] = useState<UsedData[]>([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        // axios signal
        const source = axios.CancelToken.source();
        setFetching(true);
        axios
            .get<TRUsed>("/api/dashboard/most-used", {
                cancelToken: source.token,
            })
            .then((resp) => {
                setData(resp.data);
                setFetching(false);
            })
            .catch((e: Error) =>
                console.log("fetch most used err:", e.message),
            );
        return () => {
            source.cancel("Most Used widget unmounted");
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
                            const percentage = data?.total_used
                                ? (i.count / data?.total_used) * 100
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
                                            title={`${i.count}/${data?.total_used}`}
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

import { Link, useLoaderData } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import Loader from "./loader";

type TLoaderData = Awaited<ReturnType<typeof Loader>>;
type TOrders = Awaited<ReturnType<TLoaderData["json"]>>["orders"][0]["items"];

export default function Orders() {
    const loaderData = useLoaderData<typeof Loader>();

    return (
        <div className="orders-content h-full flex flex-row p-6 gap-10">
            <div className="sidebar w-80 h-full">
                <div className="sidebar-about bg-orange-600 text-white -mx-6 px-6 py-2 rounded-tr-lg rounded-br-lg">
                    <h3 className="uppercase">Recent orders</h3>
                </div>
                <div className="mt-6">
                    <ItemsList items={loaderData.orders.map(order => order.items)} />
                </div>
            </div>
            <div className="main-content h-full w-full px-6 py-5 border rounded-xl bg-white">
                No item selected.
            </div>
        </div>
    );
}

// Items list component
function ItemsList({ items }: { items?: TOrders[] }) {

    return (
        <ul>
            {!items?.length && <li className="pl-3 text-slate-400 italic">No item available.</li>}
            {!!items?.length && items!.map((item) => (
                <li
                    className={twMerge(
                        "border-b py-2 pl-3 mb-3",
                        "hover:border-black hover:cursor-pointer hover:pl-2 hover:border-l-4",
                    )}
                    key={Math.random()}
                >
                    <Link to={`./${item}`}>Item {item}</Link>
                </li>
            ))}
        </ul>
    );
}

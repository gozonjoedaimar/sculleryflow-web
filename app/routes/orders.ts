import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";
import Orders from "app/features/orders/Orders";
import Loader from "app/features/orders/loader";

export const loader = Loader;

export const meta = useTitleMeta();

export default Orders;

import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";
import Orders from "app/features/orders/Orders";

export const loader = () => json({
    title: "Orders",
    screen_title: "Review Orders"
});

export const meta = useTitleMeta();

export default Orders;
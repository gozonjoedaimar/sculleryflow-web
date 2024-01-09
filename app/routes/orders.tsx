import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = () => json({
    title: "Orders",
    screen_title: "Review Orders"
});

export const meta = useTitleMeta();

export default function Orders()
{
    return (
        <h1>Orders data</h1>
    );
}
import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";
import Stockroom from "app/features/stockroom/Stockroom";

export const loader = async () => json({
    title: "Stockroom",
    screen_title: "Manage Stockroom Inventory",
});

export const meta = useTitleMeta();

export default Stockroom;
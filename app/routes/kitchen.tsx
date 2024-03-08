import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";
import Kitchen from "app/features/kitchen/Kitchen";

export const loader = async () => {
    return json({
        title: "Kitchen",
        screen_title: "Manage Kitchen Inventory (WIP)",
    });
}

export const meta = useTitleMeta();

export default Kitchen;
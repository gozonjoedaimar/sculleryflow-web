import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";
import Tables from "app/features/tables/Tables";

export const loader = async () => {
    return json({
        title: "Restaurant Setup",
        screen_title: "Manage Restaurant Tables (WIP)",
    });
}

export const meta = useTitleMeta();

export default Tables;

import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = async () => {
    return json({
        title: "Kitchen"
    });
}

export const meta = useTitleMeta();

export default function Kitchen()
{
    return (
        <h1>Kitchen</h1>
    );
}
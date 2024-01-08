import { json } from "@remix-run/node";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = async () => json({
    title: "Stockroom"
});

export const meta = useTitleMeta();

export default function Stockroom()
{
    return (
        <h1>Stockroom</h1>
    );
}
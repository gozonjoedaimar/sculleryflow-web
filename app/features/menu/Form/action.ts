import { ActionFunctionArgs, json } from "@remix-run/node";

export default async function action({ params }: ActionFunctionArgs) {
    return json({ params });
}
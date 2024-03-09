import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";

export const loader = ({ params }: LoaderFunctionArgs) => {
    const id = params.id as string;

    return json({
        id,
    });
}
export default function OrderView() {
    const { id } = useLoaderData<typeof loader>();
    return <p>Order-{id?.substring(0, 8)} (WIP)</p>
}

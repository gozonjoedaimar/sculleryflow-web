import { useLoaderData } from "@remix-run/react"

type loaderData = {
    id: string;
}

export default function MenuEditForm() {
    const loaderData = useLoaderData() as loaderData;
    return <p>Menu { loaderData.id ? "Edit": "Add" } Form</p>
}
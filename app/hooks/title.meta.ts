import { LoaderFunction, MetaFunction } from "@remix-run/node";

const app_name = 'Sculleryflow';

type RouteData = {
    title?: string;
    prefix?: string;
}

export const useTitleMeta = (): MetaFunction<LoaderFunction> => ({ data }) => {
    const { title, prefix } = data as RouteData;

    const routeTitle = prefix ? `${title} / ${prefix}`: title;

    const pageTitle = routeTitle ? `${routeTitle} - ${app_name}` : app_name;

    return [{ title: pageTitle }];
};
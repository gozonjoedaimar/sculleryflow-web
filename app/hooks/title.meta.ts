import { LoaderFunction, MetaFunction } from "@remix-run/node";

const app_name = 'Sculleryflow';

export const useTitleMeta = (): MetaFunction<LoaderFunction> => ({ data }) => [{title: data?.title ? `${data.title} - ${app_name}`: app_name}];
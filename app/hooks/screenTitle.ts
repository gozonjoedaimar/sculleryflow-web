import { useMatches } from "@remix-run/react";

type DefaultMatchData = {
    screen_title: string;
}

export default function useScreenTitle()
{
    const matches = useMatches().filter( match => match.data && typeof match.data === 'object' && ("screen_title" in match.data) )?.pop();

    if (!matches) return "";

    const { screen_title } = matches?.data as DefaultMatchData;
    
    return screen_title || "";
}
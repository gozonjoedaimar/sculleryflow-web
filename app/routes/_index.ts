import Index from "app/features/_index/Index";
import IndexLoader from "app/features/_index/loader";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = IndexLoader;

export const meta = useTitleMeta();

export default Index;
import MenuItem from "app/features/menu/MenuItem/MenuItem";
import MenuItemLoader from "app/features/menu/MenuItem/loader";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = MenuItemLoader;

export const meta = useTitleMeta();

export default MenuItem;
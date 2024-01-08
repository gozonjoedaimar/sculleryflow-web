import MenuItem from "app/features/menu/MenuItem";
import MenuItemLoader from "app/features/menu/menuItemLoader";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = MenuItemLoader;

export const meta = useTitleMeta();

export default MenuItem;
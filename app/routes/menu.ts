import Menu from "app/features/menu/Menu";
import MenuLoader from "app/features/menu/loader";
import { useTitleMeta } from "app/hooks/title.meta";

export const loader = MenuLoader;

export const meta = useTitleMeta();

export default Menu;
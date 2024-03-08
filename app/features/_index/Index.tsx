import BestSeller from "./widgets/BestSeller";
import MostUsed from "./widgets/MostUsed";
import LowInventory from "./widgets/low_inventory";

export default function Index() {
    return (
        <div className="dashboard p-6 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <BestSeller />
            <MostUsed title="Most Used Ingredient" />
            <LowInventory title="Least Sold" item_name="Menu" />
            <LowInventory />
            <LowInventory title="Least Used Ingredient" />
        </div>
    );
}
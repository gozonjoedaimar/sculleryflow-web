import BestSeller from "./widgets/BestSeller";
import MostUsed from "./widgets/MostUsed";
import LowInventory from "./widgets/low_inventory";

export default function Index() {
    return (
        <div className="dashboard p-6 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <BestSeller title="Best Seller (Beta)" />
            <MostUsed title="Most Used Ingredient (Beta)" />
            <LowInventory title="Low Ingredients Menu (WIP)" item_name="Menu" />
            <LowInventory title="Not Available Menu (WIP)" item_name="Menu" />
            <LowInventory title="Least Sold (WIP)" item_name="Menu" />
            <LowInventory title="Low Inventory Items/Ingredients (WIP)" />
            <LowInventory title="Least Used Ingredient (WIP)" />
        </div>
    );
}
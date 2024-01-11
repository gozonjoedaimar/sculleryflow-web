import LowInventory from "./widgets/low_inventory";

export default function Index() {
    return (
        <div className="dashboard p-6 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <LowInventory title="Best Sellers" item_name="Menu" />
            <LowInventory title="Least Sold" item_name="Menu" />
            <LowInventory />
            <LowInventory title="Least Used Ingredient" />
            <LowInventory title="Most Used Ingredient" />
        </div>
    );
}
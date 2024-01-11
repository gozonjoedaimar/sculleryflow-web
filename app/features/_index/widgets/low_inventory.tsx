import PercentageCircle from "./components/percentageCircle";
import Widget from "./widget";

type LowInventoryProps = {
    title?: string;
    item_name?: string; // for demo purposes
};

export default function LowInventory({ title = "Low Inventory", item_name = 'Ingredient' }:LowInventoryProps) {
    const data = [];

    for (let i = 0; i < 5; i++) {
        data.push(i);
    }

    return (
        <Widget title={title}>
            <div className="low-inventory-widget px-4 ">
                <table className="w-full bg-white">
                    <tbody>
                        {
                            data.map((i) => {
                                const percentage = (i/5)*100;
                                return (
                                    <tr key={`${i}`} className="border">
                                        <td className="py-2 px-4">{item_name} {i}</td>
                                        <td className="flex justify-end py-2 px-4"><PercentageCircle percentage={percentage} /></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Widget>
    );
}
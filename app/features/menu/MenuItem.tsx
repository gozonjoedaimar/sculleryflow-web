import { useLoaderData } from "@remix-run/react";
import MenuItemLoader from "./menuItemLoader";

export default function MenuItem() {
    const { item_id, name } = useLoaderData<typeof MenuItemLoader>();

    const commonIngredients = [
        "Salt",
        "Pepper",
        "Garlic",
        "Onions",
        "Olive Oil",
        "Butter",
        "Eggs",
        "Flour",
        "Sugar",
        "Milk",
    ];

    const commonProcedures = [
        "Gather all ingredients",
        "Preheat the oven if necessary",
        "Prepare ingredients (wash, chop, etc.)",
        "Mix ingredients in the specified order",
        "Cook on the stove or bake in the oven",
        "Check for doneness",
        "Let the dish cool",
        "Serve the dish",
    ];

    return (
        <>
            <p className="ml-20 md:ml-0 pb-2 text-lg md:text-center xl:text-left border-b border-black">{name || item_id}</p>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                <div className="ingredients-list mt-6">
                    <h4 className="italic mb-2">Ingredients:</h4>
                    <ul className="ml-8 list-disc">
                        {
                            commonIngredients.map((item, key) => {
                                return <li key={`${key}`} className="text-slate-500">{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="procedures mt-8">
                    <h4 className="italic mb-2">Procedure:</h4>
                    <ol className="ml-8 list-decimal">
                        {
                            commonProcedures.map((item, key) => {
                                return <li key={`${key}`} className="text-slate-500">{item}</li>
                            })
                        }
                    </ol>
                </div>
            </div>
        </>
    
    );
}
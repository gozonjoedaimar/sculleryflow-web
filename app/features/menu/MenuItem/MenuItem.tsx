import { useLoaderData } from "@remix-run/react";
import MenuItemLoader from "./loader";

export default function MenuItem() {
    const loaderData = useLoaderData<typeof MenuItemLoader>();

    if ('error' in loaderData) {
        console.log(loaderData.error);
        return <p className="text-slate-400 italic text-sm">Failed to fetch data. Please refresh the page and try again.</p>;
    }

    const { item_id, name, items, procedure } = loaderData;

    const commonIngredients = items;

    const commonProcedures = procedure.map((item) => item.step);

    return (
        <>
            <h4 className="ml-20 md:ml-0 pb-2 text-lg md:text-center xl:text-left border-b border-black">{name || item_id}</h4>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                <div className="ingredients-list mt-6">
                    <h4 className="italic mb-2">Ingredients:</h4>
                    { commonIngredients.length === 0 && <p className="text-slate-500 text-sm"><em>No ingredient listed.</em></p>}
                    <ul className="ml-8 list-disc">
                        {
                            commonIngredients.map((item) => {
                                return <li key={item._id} className="text-slate-500">{item.name}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="procedures mt-8">
                    <h4 className="italic mb-2">Procedure:</h4>
                    { commonProcedures.length === 0 && <p className="text-slate-500 text-sm"><em>No procedure listed.</em></p>}
                    <ol className="ml-8 list-decimal">
                        {
                            commonProcedures.map((item, key) => {
                                return <li key={`${key + 1}-1`} className="text-slate-500">{item}</li>
                            })
                        }
                    </ol>
                </div>
            </div>
        </>
    
    );
}
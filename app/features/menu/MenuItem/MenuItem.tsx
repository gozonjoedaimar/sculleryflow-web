import { Form, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import MenuItemLoader from "./loader";
import Edit from "app/components/button_icons/Edit";
import Delete from "app/components/button_icons/Delete";
import { useState } from "react";

export default function MenuItem() {
    const loaderData = useLoaderData<typeof MenuItemLoader>();
    const navigate = useNavigate();

    if ('error' in loaderData) {
        console.log(loaderData.error);
        return <p className="text-slate-400 italic text-sm">Failed to fetch data. Please refresh the page and try again.</p>;
    }

    const { item_id, name, items, procedure } = loaderData;

    const commonIngredients = items;

    const commonProcedures = procedure.map((item) => item.step);

    return (
        <>
            <div className="ml-20 md:ml-0 pb-2 flex flex-row items-center gap-2 text-lg md:text-center xl:text-left border-b border-black">
                <h4 >{name || item_id}</h4>
                <div className="flex items-center gap-1">
                    <Edit onClick={ () => navigate('./edit') } />
                    <DeleteItem item_id={item_id} />
                </div>
            </div>
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

type DeleteItemProps = {
    item_id: string;
}

function DeleteItem({ item_id }: DeleteItemProps) {
    const [confirm, setConfirm] = useState(false);
    const navigation = useNavigation();
    return (
        !confirm ?
        <div className="flex flex-row items-center gap-1">
            <Delete onClick={ () => { setConfirm(true) } } />
            { !item_id && <p className="text-red-500 text-sm"><em>No item id.</em></p>}
        </div>:
        <div className="flex flex-row items-center text-xs gap-1">
            <p className="italic text-red-600">Confirm delete?</p>
            <Form method="delete" action={`/menu/${item_id}/delete`}>
                <button type="submit" className="text-slate-600 border-slate-400 hover:text-white hover:bg-red-500">Yes</button>
            </Form>
            <button type="button" className="text-slate-600 border-slate-400 hover:text-white hover:bg-blue-500" onClick={ () => { setConfirm(false) } }>No</button>
            { navigation.state === "submitting" && <p className="text-slate-600">Removing...</p>}
        </div>
    );
}
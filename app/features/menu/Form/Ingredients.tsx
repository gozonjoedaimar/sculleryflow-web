import Close from "app/components/button_icons/Close";
import { useModal } from "app/components/modal/Modal";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type IngredientsProps = {
    className?: string;
    data: IngredientData[];
}

function IngredientSelector({ onSelect, selectedItem, ids = [] }: { onSelect: (item: IngredientData|null) => void, selectedItem?: IngredientData, ids?: string[] }) {
    const [selected, setSelected] = useState<IngredientData | null>(null);

    useEffect(() => {
        if (selectedItem) {
            setSelected(selectedItem);
        }
    }, [selectedItem]);

    return (
        <div className="p-3">
            <div className="flex flex-row gap-4 mb-3">
                <IngredientSelected selected={selected} />
                <IngredientSearch setSelected={setSelected} selected={selected} ids={ids} />
            </div>
            <button type="button" disabled={!selected} onClick={ () => onSelect(selected) } className={twMerge(
                "text-sm bg-blue-700 text-white border-blue-600",
                "hover:bg-blue-600",
                "disabled:bg-transparent disabled:text-slate-300 disabled:border-gray-200 disabled:italic"
            )}>Update</button>
        </div>
    )
}

type IngredientsData = {
	items: IngredientData[];
};

type IngredientData = {
	_id: string;
	name: string;
};

function IngredientSearch ({ setSelected, selected, ids }: {
        setSelected: Dispatch<SetStateAction<IngredientData | null>>,
        selected: IngredientData | null,
        ids: string[]
}) {
    const [data, setData] = useState<IngredientsData['items']>([]);

    useEffect(() => {
        const controller = axios.CancelToken.source();
        axios.get<IngredientsData>('/menu/items', { cancelToken: controller.token }).then(resp => {
            const items = resp.data.items;

            if (items) {
                setData(items);
            }
        }).catch( e => e );

        return () => {
            // cleanup
            controller.cancel();
        }
    }, []);

    return (
        <div className="ingredient-search bg-blue-50 rounded-xl px-4 py-3">
            <div className="section-info mb-3 italic">
                <h3>Available Ingredients</h3>
                { data.length > 0 && <p className="text-sm text-slate-600">Click items to select</p>}
            </div>
            <ul className="flex flex-wrap gap-3 max-w-56">
                { data.length < 1 && <li className="text-slate-600 italic text-sm">No item available.</li>}
                {
                    data.map( item => <li key={item._id} className="text-slate-600">
                        <button disabled={ids.includes(item._id)} type="button" className={twMerge(
                            "border-2 border-slate-300 text-slate-600 hover:border-orange-400 hover:text-orange-500",
                            !!selected && selected._id === item._id && "border-orange-400 text-orange-500",
                            "disabled:border-orange-100 disabled:text-orange-100"
                        )} onClick={ () => {
                            setSelected(item);
                        }}>{item.name}</button>
                    </li> )
                }
            </ul>
        </div>
    )
}

function IngredientSelected({ selected }: { selected: IngredientData | null }) {
    return (
        <div className="ingredient-selected text-sm mt-4 capitalize text-slate-600 w-64">
                <p className="space-x-2 pb-2 mt-3 mb-6 border-b">
                    <span className="italic">name:</span>
                    <span className="text-lg text-orange-500">{!!selected && selected.name}</span>
                </p>
                <p className="space-x-2 mb-3">
                    <span className="italic">amount (WIP):</span>
                    <span className="amount">
                        <input type="number" disabled className="w-24 h-10 px-2 border" />
                    </span>
                </p>
                <p className="space-x-2">
                    <span className="italic">measurement (WIP):</span>
                    <span className="measurement">
                        <select className="border h-10" disabled>
                            <option>Cup</option>
                            <option>Gram</option>
                            <option>Teaspoon</option>
                            <option>Tablespoon</option>
                            <option>Pinch</option>
                            <option>Drop</option>
                            <option>Quart</option>
                            <option>Gallon</option>
                            <option>Milliliter</option>
                            <option>Liter</option>
                        </select>
                    </span>
                </p>
        </div>
    )
}

export default function Ingredients({ className, data }: IngredientsProps) {
    const modal = useModal();
    const [ingredients, setIngredients] = useState(data);
    // fix new items disappearing when submitting form
    const [newIngredients, setNewIngredients] = useState<IngredientData[]>([]);

    // update Item
    function updateItem(index: number, value: IngredientData) {
        const existing = ingredients.length > index;
        
        if (!existing) {
            setNewIngredients( (_items) => {
                const newItems = [..._items];
                newItems[index - ingredients.length] = value;
                return newItems;
            });
            return;
        }

        setIngredients( (_items) => {
            const newItems = [..._items];
            newItems[index] = value;
            return newItems;
        });
    }

    // remove item 
    function removeItem(index: number) {
        const existing = ingredients.length > index;

        if (!existing) {
            setNewIngredients( (_items) => {
                const newItems = [..._items];
                newItems.splice(index - ingredients.length, 1);
                return newItems;
            });
            return;
        }

        setIngredients( (_items) => {
            const newItems = [..._items];
            newItems.splice(index, 1);
            return newItems;
        });
    }

    // add item
    function addItem(item: IngredientData) {
        setNewIngredients( (_items) => {
            const newItems = [..._items];
            newItems.push(item);
            return newItems;
        });
    }

    function selectAdd() {
        modal.setTitle('Add new Ingredient');
        modal.setContent(<IngredientSelector ids={ids} onSelect={(item) => {
            if (item) addItem(item);
            modal.closeModal();
        }} />);
        modal.openModal();
    }

    function selectUpdate(item: IngredientData, index: number) {
        modal.setTitle('Update Ingredient');
        modal.setContent(<IngredientSelector ids={ids} selectedItem={item} onSelect={(item) => {
            if (item) updateItem(index, item);
            modal.closeModal()
        }} />);
        modal.openModal();
    }

    // items to display
    const items = [
        ...ingredients,
        ...newIngredients
    ]

    const ids = items.map( item => item._id );

    return (
        <div className={twMerge(
            className
        )}>
            <div className="section-info mb-3 italic">
                <h3>Ingredients (WIP)</h3>
                { items.length > 0 && <p className="text-xs text-slate-400">Click items to update</p>}
            </div>
            <ul>
                { items.length < 1 && <li className="empty-list text-slate-400 italic">No ingredient added.</li> }
                { items.map((item, index) => {
                    return (
                        <li key={item._id} className="list-outside list-disc ml-5 mb-2 py-2 w-3/4">
                            {/* <div className="flex flex-row gap-3 group h-6 items-center"> */}
                            <div className="relative group h-6 w-fit">
                                <input type="hidden" name="ingredients[]" value={item._id} />
                                <button type="button" onClick={() => selectUpdate(item, index)} className="space-x-2">
                                    <span className="measurement text-orange-700">&frac12; cup</span>
                                    <span>{item.name}</span>
                                </button>
                                <div className="absolute -right-2 -top-1 hidden group-hover:block">
                                    <Close
                                        onClick={ () => removeItem(index) }
                                        hideLabel={true}
                                        label="Remove Ingredient"
                                    />
                                </div>
                            </div>
                        </li>
                    );
                }) }
                <li className="add-item">
                    <button
                        type="button"
                        className="default text-xs bg-green-600 text-white hover:bg-green-500 mt-3"
                        onClick={ () => selectAdd()}
                    >Add Item</button>
                </li>
            </ul>
        </div>
    );
}
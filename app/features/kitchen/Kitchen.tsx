import { twMerge } from "tailwind-merge";

export default function Kitchen() {
	return (
		<div className="orders-content h-full flex flex-row p-6 gap-10">
			<div className="sidebar w-80 h-full">
				<div className="sidebar-about bg-green-600 text-white -mx-6 pl-8 py-2 rounded-tr-lg rounded-br-lg">
					<h3 className="uppercase">Kitchen Items</h3>
				</div>
                <div className="mt-6">
                    <ItemsList />
                </div>
			</div>
			<div className="main-content h-full w-full px-6 py-5 border rounded-xl bg-white">
				No item selected.
			</div>
		</div>
	);
}

// Items list component
function ItemsList() {
    return (
        <ul>
            <li className="pl-3 text-slate-400 italic">No item available.</li>
            { [].map( (item) => (
                <li className={twMerge(
                    "border-b py-2 pl-3 mb-3",
                    "hover:border-black hover:cursor-pointer hover:pl-2 hover:border-l-4"
                )} key={Math.random()}>
                    Item {item}
                </li>
            ) ) }
        </ul>
    );
}
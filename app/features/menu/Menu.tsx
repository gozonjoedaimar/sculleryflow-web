import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import MenuLoader from "./loader";
import { twMerge } from "tailwind-merge";

export default function Menu() {
    const { menu } = useLoaderData<typeof MenuLoader>();
	return (
		!menu ? <div>No menu available.</div>:
		<div className="menu-content flex flex-row space-x-6">
			<div className="menu-list w-72">
				<h3 className="mb-3 pl-10 py-2 -ml-7 uppercase bg-blue-800 text-white rounded-tr-xl rounded-br-xl">Available Menu:</h3>
				<ul className="space-y-3">
					{menu?.map((item) => {
						return (
							<li key={item._id} className="border-b border-blue-200">
								<NavLink to={`/menu/${item._id}`} className={ ({ isActive, isPending }) => twMerge(
									"block pl-2 pb-2 pt-1 border-l-4 border-transparent hover:text-blue-800 hover:border-blue-600",
									(isActive || isPending) && "font-bold text-blue-800 border-blue-600",
								)  }>{item.name}</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="menu-item bg-blue-200 w-full rounded-2xl p-5">
				<Outlet />
			</div>
		</div>
	);
}
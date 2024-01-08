import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import MenuLoader from "./loader";
import { twMerge } from "tailwind-merge";

export default function Menu() {
    const { menu } = useLoaderData<typeof MenuLoader>();
	return (
		<div className="menu-content flex flex-row">
			<div className="menu-list w-72">
				<h3 className="mb-5 italic underline">Available Menu:</h3>
				<ul className="space-y-3">
					{menu?.map((item) => {
						return (
							<li key={item._id}>
								<NavLink to={`/menu/${item._id}`} className={ ({ isActive, isPending }) => twMerge(
									"block pl-2 border-l-4 border-transparent hover:text-blue-800 hover:border-blue-600",
									(isActive || isPending) && "font-bold text-blue-800 border-blue-600",
								)  }>{item.name}</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="menu-item bg-blue-100 w-full rounded-2xl p-5">
				<Outlet />
			</div>
		</div>
	);
}
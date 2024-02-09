import { NavLink, Outlet, useLoaderData, useLocation, useMatches, useNavigate } from "@remix-run/react";
import MenuLoader from "./loader";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import useWindowSize from "app/hooks/windowsize";
import PageActions from "app/components/fab/PageActions";
import ActionButton from "app/components/fab/ActionButton";

export default function Menu() {
	const { item_id } = (useMatches().pop()?.params || {}) as { item_id?: string };
	const basePath = (useLocation().pathname || '').split('/').slice(-1).join();
    const { menu } = useLoaderData<typeof MenuLoader>();
	const [openContent, setOpenContent] = useState(false);
	const { isMedium } = useWindowSize();
	const navigate = useNavigate();

	useEffect(() => {
		if (['add','edit'].includes(basePath)) {
			if (isMedium) {
				setOpenContent(false);
			}
			else {
				setOpenContent(true);
			}
		}
		else if (!isMedium && !!item_id) {
			setOpenContent(true);
		}
		else if (isMedium) {
			setOpenContent(false);
		}
		else if ("menu" === basePath) {
			setOpenContent(false);
		}
	}, [item_id, basePath, isMedium]);

	return (
		!menu ? <div>No menu available.</div>:
		<div className="menu-content relative flex flex-row px-6 py-6 h-full">
			<div className={twMerge(
				"menu-list w-full md:w-72 flex flex-col",
				openContent && "w-fit absolute pt-2"
			)}>
				<h3 className={twMerge(
					"max-w-xs mb-3 pl-10 py-2 -ml-7 uppercase bg-blue-800 text-white rounded-tr-xl rounded-br-xl",
					openContent && "w-fit pr-3"
				)}>{
					openContent ? <button type="button" onClick={ () => { navigate('/menu'); } }>Menu</button>:"Available Menu:"
				}</h3>
				<ul className={twMerge(
					"overflow-auto space-y-3",
					openContent && "hidden md:block"
				)}>
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
			<div className={twMerge(
				"menu-item overflow-auto bg-white border border-slate-300 w-full rounded-2xl ml-4 p-5 hidden md:block",
				openContent && "block ml-0"
			)}>
				<Outlet />
			</div>
			<PageActions className={twMerge(
				"absolute right-5 bottom-5 md:bottom-10 md:right-10 2xl:bottom-12 2xl:right-12",
				openContent && "right-9 bottom-9"
			)}>
				{ ('add' === basePath) && <ActionButton onClick={ () => { navigate('/menu') } }>Cancel</ActionButton>}
				{ ('add' !== basePath) && <ActionButton onClick={ () => { navigate('add') } }>New</ActionButton>}
				{ (!!item_id && basePath !== 'edit') && <ActionButton onClick={ () => { navigate(`${item_id}/edit`) } }>Edit</ActionButton>}
			</PageActions>
		</div>
	);
}
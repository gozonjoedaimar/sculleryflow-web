import { Link, Outlet, useLoaderData } from "@remix-run/react";
import MenuLoader from "./loader";

export default function Menu() {
    const { menu } = useLoaderData<typeof MenuLoader>();
	return (
		<>
			<header className="border-b">
				<h1>
					<Link to='/menu'>Menu</Link>
				</h1>
			</header>
			<div className="menu-content flex flex-row">
				<div className="menu-list border-r">
					<ul>
						{menu?.map((item) => {
							return (
								<li key={item._id}>
									<Link to={`/menu/${item._id}`}>{item.name}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="menu-item">
					<Outlet />
				</div>
			</div>
		</>
	);
}
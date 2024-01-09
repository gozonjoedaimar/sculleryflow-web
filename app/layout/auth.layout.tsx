import { Form, NavLink, Outlet, useNavigation } from "@remix-run/react";
import { side_nav } from "app/config/navigation";
import useAuth from "app/hooks/auth";
import useScreenTitle from "app/hooks/screenTitle";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function AuthLayout() {
    const [isPageLoad, setIsPageLoad] = useState(false);
    const screenTitle = useScreenTitle();
    const { authenticated } = useAuth();
    const navigation = useNavigation();
    
    useEffect(() => {
        if (navigation.state === 'idle') {
            setIsPageLoad(false);
        }
    }, [navigation.state]);

    return (
        !authenticated ?
        null:
        <div className="dashboard-layout h-full flex flex-row bg-teal-950">
            <div className="sidebar w-72 flex flex-col p-7 pr-0 text-white">
                <div className="app-info text-2xl mb-8">
                    <h1>Sculleryflow</h1>
                </div>
                <nav>
                    <ul className="flex flex-col gap-3">
                        {
                            Object.keys(side_nav).map( (key) => {
                                const path = side_nav[key].path;
                                const name = side_nav[key].name;
                                const icon = side_nav[key].icon;
                                return <li key={key}>
                                    <NavLink
                                        to={path}
                                        className={ ({ isActive }) => twMerge(
                                            isActive && "font-bold text-orange-500 border-r-4 border-orange-500",
                                            "flex items-center w-full py-1 gap-2 hover:text-orange-500 hover:border-r-4 hover:border-orange-500"
                                        )}
                                        onClick={ () => setIsPageLoad(true) }
                                    >
                                        {icon && <i className={twMerge(icon, "text-xl")} />}
                                        {name}
                                    </NavLink>
                                </li>;
                            })
                        }
                    </ul>
                </nav>
                <footer className="mt-auto">
                    <p className="text-sm italic">Version 0.1.0</p>
                </footer>
            </div>
            <div className={twMerge(
                "content-area",
                "w-full p-7 rounded-tl-3xl rounded-bl-3xl bg-teal-50",
            )}>
                <header className={twMerge(
                    navigation.state === 'loading' && isPageLoad && 'opacity-50 pointer-events-none',
                    "flex flex-row justify-between items-center mb-5 pb-4 border-b"
                )}>
                    <div className="page-info">
                        <h2 className="screen-title text-xl font-semibold text-teal-950">{screenTitle || "Dashboard"}</h2>
                    </div>
                    <nav className="page-settings">
                        <ul>
                            <li>
                                <Form method="post" action="/logout">
                                    <button type="submit" className="link text-blue-800">
                                        <i className="ri-logout-box-r-line" />
                                        Logout
                                    </button>
                                </Form>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className={twMerge(
                    navigation.state === 'loading' && isPageLoad && 'opacity-50 pointer-events-none'
                )}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
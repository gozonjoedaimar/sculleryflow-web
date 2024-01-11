import { Form, NavLink, Outlet, useNavigation } from "@remix-run/react";
import { side_nav } from "app/config/navigation";
import useAuth from "app/hooks/auth";
import useScreenTitle from "app/hooks/screenTitle";
import useWindowSize from "app/hooks/windowsize";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import logo from './assets/logo48.png';

export default function AuthLayout() {
    const [isPageLoad, setIsPageLoad] = useState(false);
    const screenTitle = useScreenTitle();
    const { authenticated } = useAuth();
    const navigation = useNavigation();
    const { isMobile } = useWindowSize();
    const version = "0.1.0";
    
    useEffect(() => {
        if (navigation.state === 'idle') {
            setIsPageLoad(false);
        }
    }, [navigation.state]);

    return (
        !authenticated ?
        null:
        <div className={twMerge(
            "dashboard-layout h-full flex flex-row bg-teal-950"
        )}>
            <div className="sidebar sm:w-80 flex flex-col p-7 pr-0 overflow-auto text-white">
                <div className="app-info text-2xl mb-6 sm:mb-8">
                    <h1 className="flex flex-col items-center w-fit -ml-[6px] gap-1 sm:-ml-1 sm:flex-row sm:gap-2">
                        <img src={logo} alt="Sculleryflow Logo" className="w-[32px]" />
                        {isMobile?"SF":"Sculleryflow"}
                    </h1>
                </div>
                <nav className="mb-8">
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
                                        {!isMobile && name}
                                    </NavLink>
                                </li>;
                            })
                        }
                    </ul>
                </nav>
                <footer className="mt-auto">
                    <p className="-ml-2 pr-9 sm:pr-0 sm:ml-0 text-sm italic">{isMobile ? "v": "Version "}{version}</p>
                </footer>
            </div>
            <div className={twMerge(
                "content-area",
                "flex flex-col w-full overflow-auto rounded-tl-3xl rounded-bl-3xl bg-teal-50",
            )}>
                <header className={twMerge(
                    "flex-grow-0 mt-6 px-6 pb-5",
                    navigation.state === 'loading' && isPageLoad && 'opacity-50 pointer-events-none',
                    "flex flex-row justify-between items-center border-b"
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
                    "relative flex-grow overflow-auto",
                    navigation.state === 'loading' && isPageLoad && 'opacity-50 pointer-events-none'
                )}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
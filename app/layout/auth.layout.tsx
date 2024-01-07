import { Form, Link, Outlet, useNavigation } from "@remix-run/react";
import { side_nav } from "app/config/navigation";
import useAuth from "app/hooks/auth";
import { twMerge } from "tailwind-merge";

export default function AuthLayout() {
    const { authenticated } = useAuth();
    const navigation = useNavigation();
    return (
        !authenticated ?
        null:
        <div className="dashboard-layout h-full flex flex-row">
            <div className="sidebar w-48 flex flex-col border-r pr-2">
                <div className="app-info border-b">
                    <h1>Dashboard</h1>
                </div>
                <nav>
                    <ul>
                        {
                            Object.keys(side_nav).map( (key) => {
                                return <li key={key}>
                                    <Link to={side_nav[key].path}>{side_nav[key].name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div>
            <div className={twMerge(
                "content-area",
                "w-full",
                navigation.state === 'loading' && 'opacity-50 pointer-events-none'
            )}>
                <header className="flex flex-row justify-between border-b">
                    <div className="page-info">
                        <h2>Dashboard</h2>
                    </div>
                    <nav className="page-settings">
                        <ul>
                            <li>
                                <Form method="post" action="/logout">
                                    <button type="submit" className="link">Logout</button>
                                </Form>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
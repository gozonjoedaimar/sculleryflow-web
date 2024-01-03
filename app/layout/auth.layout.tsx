import { Outlet } from "@remix-run/react";
import useAuth from "app/hooks/auth";

export default function AuthLayout() {
    const { authenticated } = useAuth();
    return (
        !authenticated ?
        null:
        <>
            <p>Auth</p>
            <Outlet />
        </>
    );
}
import { Outlet } from "@remix-run/react";

export default function GuestLayout() {
    return (
        <>
            <p>Guest layout</p>
            <Outlet />
        </>
    );
}
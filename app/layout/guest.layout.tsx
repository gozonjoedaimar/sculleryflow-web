import { Outlet } from "@remix-run/react";
import { twMerge } from 'tailwind-merge';

export default function GuestLayout() {
    return (
        <div
            className={twMerge(
                "guest-layout",
                "h-full",
                "bg-gradient-to-br from-teal-800 to-teal-950",
            )}
        >
            <Outlet />
        </div>
    );
}
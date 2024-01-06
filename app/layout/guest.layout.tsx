import { Outlet } from "@remix-run/react";
import { twMerge } from 'tailwind-merge';

export default function GuestLayout() {
    return (
        <div
            className={twMerge(
                "guest-layout",
                "h-full",
                "flex items-center justify-center"
            )}
        >
            <Outlet />
        </div>
    );
}
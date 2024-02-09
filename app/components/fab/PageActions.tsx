import FAB from "./FAB";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type PageActionsProps = {
    className?: string;
	children?: React.ReactNode;
};

export default function PageActions({ className, children }: PageActionsProps) {
	const [open, setOpen] = useState(false);
	const actions = useRef<HTMLDivElement>(null);
    const drawer = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null;
		if (open) {
			timeoutId = setTimeout(() => {
				setOpen(false);
			}, 3000);
		}
		actions.current?.addEventListener("mouseenter", () => {
			timeoutId && clearTimeout(timeoutId);
		});
		actions.current?.addEventListener("mouseleave", () => {
			timeoutId = setTimeout(() => {
				setOpen(false);
			}, 1000);
		});
		return () => {
			timeoutId && clearTimeout(timeoutId);
		};
	}, [open]);

    useEffect(() => {

        const timeoutId: NodeJS.Timeout = setTimeout(() => {
            drawer.current?.classList.remove('animate-bounce');
        }, 4500);

        drawer.current?.addEventListener('mouseenter', () => {
            timeoutId && clearTimeout(timeoutId);
            drawer.current?.classList.remove('animate-bounce');
        });

        return () => {
            timeoutId && clearTimeout(timeoutId);
        }
    }, [])

	return (
		<div className={twMerge(
            "mt-auto flex flex-col justify-end items-end gap-2",
            className
        )}>
			<div
                ref={actions}
				className={twMerge(
					"actions flex flex-col gap-2 transition-transform origin-bottom-right",
					open ? "" : "scale-0",
				)}
			>
				{children}
			</div>
            <div className="animate-bounce transition-transform" ref={drawer}>
                <FAB onClick={() => setOpen(!open)} />
            </div>
		</div>
	);
}
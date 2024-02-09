import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type ActionButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function ActionButton({ children, onClick, className }: ActionButtonProps) {
    return (
        <button type="button" onClick={onClick} className={twMerge(
            "bg-gray-300 text-black hover:bg-gray-400",
            className
        )}>
            {children}
        </button>
    )
}
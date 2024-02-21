import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type CheckProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    label?: string;
}

export default function Check({ label = "Check", onClick, type = "button", ...props }: CheckProps)
{
    return (
        <button {...props} type={type} onClick={onClick} className={twMerge(
            "w-5 h-5 flex flex-row justify-center items-center rounded-full p-0 group bg-green-600",
            "hover:bg-green-500 hover:px-1 hover:w-fit",
            "active:bg-green-500 active:px-1 active:w-fit",
            "focus:bg-green-500 focus:px-1 focus:w-fit",
            "disabled:opacity-50 disabled:hover:bg-green-600 disabled:pointer-events-none",
        )}>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4 m-auto">
                <title>Save</title>
                <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={twMerge(
                "hidden w-0 text-xs text-white transition-all",
                "group-hover:w-fit group-focus:w-fit group-active:w-fit",
                "group-hover:inline group-focus:inline group-active:inline",
            )}>{ label }</span>
        </button>
    );
}
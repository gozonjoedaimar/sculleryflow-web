import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type CloseProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    label?: string;
    hideLabel?: boolean;
}

export default function Close({ label = "Close", hideLabel = false, onClick, type = "button", ...props } : CloseProps)
{
    return (
        <button {...props} type={type} title={label} onClick={onClick} className={twMerge(
            "group w-5 h-5 flex flex-row justify-center items-center rounded-full p-0 bg-orange-600",
            "hover:bg-orange-500",
            "active:bg-orange-500",
            "focus:bg-orange-500",
            !hideLabel && "hover:px-1 hover:w-fit",
            !hideLabel && "active:px-1 active:w-fit",
            !hideLabel && "focus:px-1 focus:w-fit",
            "disabled:opacity-50 disabled:hover:bg-orange-600 disabled:pointer-events-none"
        )}>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2 ">
                <title>{label}</title>
                <g id="Menu / Close_LG">
                    <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </svg>
            {
                !hideLabel &&
                <span className={twMerge(
                    "hidden w-0 ml-[2px] text-xs text-white transition-all",
                    "group-hover:w-fit group-focus:w-fit group-active:w-fit",
                    "group-hover:inline group-focus:inline group-active:inline",
                )}>{ label }</span>
            }
        </button>
    );
}
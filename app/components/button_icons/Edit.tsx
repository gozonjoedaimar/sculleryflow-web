import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type CloseProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    label?: string;
}

export default function Edit({ label = "Edit", onClick, type="button", ...props } : CloseProps)
{
    return (
        <button {...props} type={type} onClick={onClick} className={twMerge(
            "w-5 h-5 flex flex-row justify-center items-center group rounded-full p-0",
            "bg-blue-800",
            "hover:w-fit hover:px-1 hover:bg-blue-700",
            "focus:w-fit focus:px-1 focus:bg-blue-700",
            "active:w-fit active:px-1 active:bg-blue-700"
        )}>
            <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
                <title>Edit</title>
                <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21H12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={twMerge(
                "hidden w-0 text-xs text-white transition-all",
                "group-hover:w-fit group-focus:w-fit group-active:w-fit",
                "group-hover:inline group-focus:inline group-active:inline",
            )}>{ label }</span>
        </button>
    );
}
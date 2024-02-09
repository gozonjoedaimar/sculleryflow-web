import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type CheckProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Check({ onClick }: CheckProps)
{
    return (
        <button type="button" onClick={onClick} className="w-5 h-5 rounded-full p-0 bg-green-600 hover:bg-green-500">
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4 m-auto">
                <title>Save</title>
                <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    );
}
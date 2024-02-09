import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type CloseProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Close({ onClick } : CloseProps)
{
    return (
        <button type="button" onClick={onClick} className="w-5 h-5 rounded-full p-0 bg-orange-600 hover:bg-orange-500">
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-1/2 h-1/2 m-auto">
                <title>Cancel</title>
                <g id="Menu / Close_LG">
                    <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
        </button>
    );
}
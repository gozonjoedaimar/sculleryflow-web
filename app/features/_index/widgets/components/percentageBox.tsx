import { twMerge } from "tailwind-merge";

type PercentageBoxProps = {
    percentage: number;
    className?: string;
}

export default function PercentageBox({ percentage = 0, className }: PercentageBoxProps)
{
    return (
        <div className={twMerge(
            "percentage-box w-fit min-w-[38px] bg-white h-10 flex flex-col items-center justify-center relative rounded overflow-hidden",
            className
        )}>
            <p className="static z-10 w-fit mx-1 p-1 bg-teal-600 text-xs text-white rounded">{percentage}%</p>
            <div className="bar absolute z-0 h-full w-full flex flex-col justify-end">
                <div className="w-full bg-red-400" style={{
                    height: `${percentage}%`
                }}>
                </div>
            </div>
        </div>
    );
}
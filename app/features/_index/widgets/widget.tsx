import { PropsWithChildren } from "react";

type WidgetProps = {
    title: string
}

export default function Widget({ title, children }: PropsWithChildren<WidgetProps>)
{
    return (
        <div className="widget-container w-full rounded-xl bg-white overflow-hidden shadow-xl border">
            <div className="widget-head p-4 text-lg font-semibold text-teal-800">
                <h3>{title}</h3>
            </div>
            <div className="widget-content pb-4 rounded-bl-xl rounded-br-xl border-teal-800">
                {children}
            </div>
        </div>
    );
}
import { twMerge } from "tailwind-merge";

type IngredientsProps = {
    className?: string;
}

export default function Ingredients({ className }: IngredientsProps) {
    return (
        <div className={twMerge(
            className
        )}>
            <h3 className="italic">Ingredients (WIP)</h3>
            {/* TODO: add ingredient manager */}
        </div>
    );
}
import { useLoaderData, useNavigate } from "@remix-run/react"
import Loader from "./loader";
import { useEffect, useRef } from "react";
import Check from "app/components/button_icons/Check";
import Close from "app/components/button_icons/Close";

const loader = Loader;

type loaderData = typeof loader;

export default function MenuEditForm() {
    const { id, menu } = useLoaderData<loaderData>();
    console.log(menu);
    return (
        <h4 className="ml-20 md:ml-0 pb-2 text-lg md:text-center xl:text-left border-b border-black">
            {
                id ? 
                <TitleInput name="name" value={ menu.name } sub="Edit Menu Item" />:
                <TitleInput name="name" value="" sub="Add Menu Item" />
            }
        </h4>
    )
}

type TitleInputProps = {
    name: string;
    value: string;
    sub?: string;
}

function TitleInput({ name, value, sub }: TitleInputProps) {
    const input = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (input.current instanceof HTMLInputElement) {
            input.current.value = value;
        }
    }, [value]);
    return (
        <div className="flex flex-row items-center gap-2">
            <input ref={input} type="text" name={name} id={name} className="default focus:outline-none placeholder:italic" placeholder="Menu Name" />
            { !!sub && <label htmlFor={name} className="ml-3 text-sm text-slate-500 italic">({ sub })</label> }
            <div className="form-action flex flex-row gap-1">
                <Check onClick={ () => { navigate(-1) } } />
                <Close onClick={ () => { navigate(-1) } } />
            </div>
        </div>
    )
}
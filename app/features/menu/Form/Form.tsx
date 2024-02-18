import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react"
import Loader from "./loader";
import Action from "./action";
import { RefObject, useEffect, useRef } from "react";
import Check from "app/components/button_icons/Check";
import Close from "app/components/button_icons/Close";

type LoaderData = {
    id: string;
    menu: {
        name: string;
    }
}

export default function MenuEditForm() {
    const form = useRef<HTMLFormElement>(null);
    const loaderData = useLoaderData<typeof Loader>();
    const actionData = useActionData<typeof Action>();

    if ('error' in loaderData) {
        console.log(loaderData.error);
        return <p className="text-slate-400 italic text-sm">Failed to fetch data. Please refresh the page and try again.</p>;
    }

    const { id, menu } = loaderData as LoaderData;

    return (
        <Form ref={form} method="post">
            <div className="ml-20 md:ml-0 pb-2 text-lg md:text-center xl:text-left border-b border-black">
                <TitleInput form={form} name="name" id={id} error={ actionData?.error } value={ id? menu.name: ""} label={ id ? "Edit Menu Item": "Add Menu Item"} />
            </div>
        </Form>
    )
}

type TitleInputProps = {
    form: RefObject<HTMLFormElement>;
    name: string;
    id?:string;
    value: string;
    label?: string;
    error?: string
}

function TitleInput({ form, name, id, error, value, label }: TitleInputProps) {
    const menuNameInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const navigation = useNavigation();
    const submit = useSubmit();
    useEffect(() => {
        if (menuNameInput.current instanceof HTMLInputElement) {
            menuNameInput.current.value = value;
        }
    }, [value]);
    return (
        <div className="flex flex-row items-center gap-2">
            { !id && <input type="hidden" name="_action" value="new" /> }
            <input ref={menuNameInput} type="text" name={name} id={name} className="default focus:outline-none placeholder:italic" placeholder="Menu Name" />
            { !!label && <label htmlFor={name} className="ml-3 text-sm text-slate-500 italic">({ label })</label> }
            <div className="form-action flex flex-row gap-1">
                <Check disabled={navigation.state !== 'idle'} onClick={ () => submit(form.current) } />
                <Close disabled={navigation.state !== 'idle'} onClick={ () => { navigate((id?`/menu/${id}`:"..")) } } />
            </div>
            { navigation.state === 'submitting' && <p className="text-slate-400 text-sm">saving...</p> }
            { navigation.state !== 'submitting' && !!error && <p className="text-red-500 text-sm">{ error }</p> }
        </div>
    )
}
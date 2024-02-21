import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type ProcedureProps = {
    className?: string;
    data?: {
        procedure: Step[];
    }
}

type Step = {
    _id?: string;
    step: string;
}

export default function Procedure( { className, data }: ProcedureProps ) {
    const { procedure } = data || {};
    const [steps, setSteps] = useState<Step[]>([]);
    const [newSteps, setNewSteps] = useState<Step[]>([]);
    const [removedSteps, setRemovedSteps] = useState<string[]>([]);

    // set initial steps
    useEffect( () => {
        if (procedure) {
            setSteps([...procedure]);
        }
    }, [procedure]);

    // update step
    function updateStep(index: number, value: string) {
        const existing = steps.length > index;
        
        if (!existing) {
            setNewSteps( (_steps) => {
                const newSteps = [..._steps];
                newSteps[index - steps.length].step = value;
                return newSteps;
            });
            return;
        }

        setSteps( (_steps) => {
            const newSteps = [..._steps];
            newSteps[index].step = value;
            return newSteps;
        });
    }

    // remove step
    function removeStep(index: number) {
        const existing = steps.length > index;
        if (!existing) {
            setNewSteps( (_steps) => {
                const newSteps = [ ..._steps ];
                newSteps.splice((index-steps.length), 1);
                return newSteps;
            });
            return;
        }

        setSteps( (_steps) => {
            const newSteps = [ ..._steps ];
            const id = newSteps[index]._id || "";
            if (id) {
                updateRemovedSteps(id);
            }
            newSteps.splice(index, 1);
            return newSteps;
        });
    }

    // list removed steps
    function updateRemovedSteps(id: string) {
        setRemovedSteps((_removed) => {
            const newRemoved = [ ..._removed ];
            newRemoved.push(id);
            return newRemoved;
        })
    }

    // add step
    function addStep() {
        setNewSteps( (steps) => ([ ...steps, { _id: `${Math.random()}`, step: "" } ]) );
    }

    // Auto resize textarea
    function autoResizeTextarea(textarea: HTMLTextAreaElement) {
        textarea.style.height = '2rem'; // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
    }

    const list = [...(steps.filter( item => !removedSteps.includes(item._id || "") )), ...newSteps];

    return (
        <div className={twMerge(
            "bg-orange-50-",
            className
        )}>
            <h3 className="mb-3 italic">Procedure:</h3>
            <ol>
                { (list.length < 1) && <li className="h-12 align-middle text-slate-400 italic">No step added yet.</li> }
                { list.map((step, index) => (
                    <li key={step._id} className="ml-4 mb-2 group list-decimal">
                        <div className="flex flex-row items-center w-full border-b focus-within:border-black hover:border-black">
                            {/* <input type="text" className="default h-8 grow pl-2 focus:outline-none bg-transparent" value={step.step} onChange={ (e) => updateStep(index, e.target.value) } /> */}
                            <textarea
                                name="step[]"
                                onInput={ (e) => autoResizeTextarea(e.target as HTMLTextAreaElement) }
                                onChange={ (e) => updateStep(index, e.target.value) }
                                value={step.step}
                                className="h-8 grow resize-none overflow-hidden focus:outline-none bg-transparent"
                            />
                            <button type="button" className="hidden text-xs bg-red-400 text-white group-hover:inline-block" onClick={ () => removeStep(index) }>Remove</button>
                        </div>
                    </li>
                ))}
                <li>
                    <button type="button" className="default text-xs bg-green-600 text-white hover:bg-green-500" onClick={ () => addStep() }>Add Step</button>
                </li>
            </ol>
        </div>
    );
}
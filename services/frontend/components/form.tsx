import type { JSX, Setter } from "solid-js";
import { createContext, createEffect, createSignal, splitProps, useContext } from "solid-js";
import Text from "./text";

const FormContext = createContext<{
    setHasRequiredFields: Setter<boolean>;
}>({
    setHasRequiredFields: () => () => { },
});

interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
    children: JSX.Element;
    callback: () => void;
}

export function Form(props: FormProps) {
    const [hasRequiredFields, setHasRequiredFields] = createSignal(false);
    const [local, rest] = splitProps(props, ["children", "callback"]);

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (local.callback) {
            local.callback();
        }
    }

    return (
        <FormContext.Provider value={{ setHasRequiredFields }}>
            <form
                {...rest}
                onSubmit={handleSubmit}
                class="flex flex-col bg-background-elevated rounded-2xl w-xl"
            >
                {hasRequiredFields() && (
                    <Text components="p">
                        Tous les champs marqués d'un * sont obligatoires
                    </Text>
                )}
                {local.children}
            </form>
        </FormContext.Provider >
    )
}

interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
    label: string;
    required?: boolean;
}

export function Label(props: LabelProps) {
    return (
        <label class="text-primary p-2"
            for={props.for}>
            {props.label}
            {props.required && <span class="">*</span>}
        </label>
    )
}

interface TextFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label: string,
}

export function TextField(props: TextFieldProps) {

    const formContext = useContext(FormContext);
    const [local, rest] = splitProps(props, ["label"]);

    createEffect(() => {
        if (rest.required && formContext) {
            formContext.setHasRequiredFields(true);
        }
    })

    return (
        <fieldset class="flex flex-col">
            <Label label={local.label} required={rest.required} for={rest.name} />
            <input
                class="bg-primary rounded-md m-2"
                id={rest.name}
                {...rest}
            />
        </fieldset>
    )
}

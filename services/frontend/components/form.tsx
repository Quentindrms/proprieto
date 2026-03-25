import clsx from "clsx";
import type { JSX, Setter } from "solid-js";
import {
	createContext,
	createEffect,
	createSignal,
	For,
	splitProps,
	useContext,
} from "solid-js";
import Text from "./text";

const FormContext = createContext<{
	setHasRequiredFields: Setter<boolean>;
}>({
	setHasRequiredFields: () => () => {},
});

interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
	children: JSX.Element;
	callback: (e?: SubmitEvent) => void;
	background?: boolean;
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
				class={clsx(
					"flex flex-col rounded-2xl w-xl",
					props.background ? "bg-background-elevated" : "",
				)}
			>
				{hasRequiredFields() && (
					<Text components="p">
						Tous les champs marqués d'un * sont obligatoires
					</Text>
				)}
				{local.children}
			</form>
		</FormContext.Provider>
	);
}

interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
	label: string;
	required?: boolean;
}

export function Label(props: LabelProps) {
	return (
		<label class="text-primary p-2" for={props.for}>
			{props.label}
			{props.required && <span class="">*</span>}
		</label>
	);
}

interface TextFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export function TextField(props: TextFieldProps) {
	const formContext = useContext(FormContext);
	const [local, rest] = splitProps(props, ["label"]);

	createEffect(() => {
		if (rest.required && formContext) {
			formContext.setHasRequiredFields(true);
		}
	});

	return (
		<fieldset class="flex flex-col">
			<Label label={local.label} required={rest.required} for={rest.name} />
			<input class="bg-primary rounded-md p-1" id={rest.name} {...rest} />
		</fieldset>
	);
}

interface SelectProps extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	labelOptions: string;
	options: { value: string; label: JSX.Element; disabled?: boolean }[];
}

export function Select(props: SelectProps) {
	const formContext = useContext(FormContext);
	const [local, rest] = splitProps(props, ["label", "labelOptions", "options"]);

	createEffect(() => {
		formContext.setHasRequiredFields(true);
	});

	return (
		<fieldset class="flex flex-col">
			<Label label={local.label} required={rest.required} />

			<select class="bg-primary rounded-md p-1" id={rest.name} {...rest}>
				<option value="" disabled selected>
					- {local.labelOptions} -
				</option>

				<For each={local.options}>
					{(option) => (
						<option value={option.value} disabled={option.disabled}>
							{option.label}
						</option>
					)}
				</For>
			</select>
		</fieldset>
	);
}

interface CheckBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export function CheckBox(props: CheckBoxProps) {
	const [local, rest] = splitProps(props, ["label"]);

	return (
		<fieldset class="flex">
			<Label label={local.label} required={rest.required} for={rest.name} />
			<input
				type="checkbox"
				class="bg-primary rounded-md p-1"
				id={rest.name}
				{...rest}
			/>
		</fieldset>
	);
}

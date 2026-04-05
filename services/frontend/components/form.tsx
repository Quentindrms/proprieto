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
	setHasRequiredFields: () => () => { },
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
					"flex flex-col rounded-2xl w-xl bg-background-base p-4 shadow-xs shadow-background-muted",
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
		<label class="font-base-bold p-1" for={props.for}>
			{props.label}
			{props.required && <span class="">*</span>}
		</label>
	);
}

interface TextFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	type?: "date" | "email" | "tel" | "password" | "number"
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
			<input type={props.type ? props.type : "text"} class="bg-background-base border-slate-strong border rounded-md p-1 shadow-md shadow-slate-marked focus:outline-none focus:ring-2 focus:ring-action-green" id={rest.name} {...rest} />
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

			<select class="bg-background-base rounded-md p-2 border border-slate-strong font-base-bold shadow-md shadow-slate-marked focus:outline-none focus:ring-2 focus:ring-action-green" id={rest.name} {...rest}>
				<option class="font-base-medium" value="" disabled selected>
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

interface ToggleSwitchProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label: string,
}

export function ToggleSwitch(props: ToggleSwitchProps) {
	const [local, rest] = splitProps(props, ["label"]);

	const toggleAppearance = "w-16 h-10 flex shrink-0 items-center ml-4 p-1 rounded-full bg-slate-200 rounded-full";
	const afterAppearance = "after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md"
	const peerAppearance = "peer-checked:bg-action-green after:duration-300 peer-checked:after:translate-x-6";

	return (
		<label class="font-base-bold p-1">
			{props.label}
			<input {...local} type="checkbox" class="appearance-none peer" />
			<span class={clsx([toggleAppearance, afterAppearance, peerAppearance])}></span>
		</label>
	)
}

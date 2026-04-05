import clsx from "clsx";
import {
	FaRegularPenToSquare,
	FaSolidPlus,
	FaSolidRemove,
} from "solid-icons/fa";
import { type JSX, splitProps } from "solid-js";
import type { ActionButtonColor, ButtonColor, ButtonIcons } from "../types/styleTypes";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	type: "submit" | "button" | "menu";
	children: JSX.Element;
	color?: ButtonColor;
	icons?: ButtonIcons;
}

export function Button(props: ButtonProps) {
	const [local, rest] = splitProps(props, ["color", "icons", "children"]);

	const colorClases: Record<ButtonColor, string> = {
		green: "bg-action-green hover:bg-action-green/90",
		red: "bg-action-red hover:bg-action-red/90",
		blue: "bg-action-blue hover:bg-action-blue/90",
	};

	const IconClasses: Record<string, () => JSX.Element> = {
		add: () => <FaSolidPlus size={25} color="" />,
		edit: () => <FaRegularPenToSquare size={25} />,
		delete: () => <FaSolidRemove size={25} />,
	};

	const globalClasses =
		"w-fit h-fit rounded-xl pr-5 pl-5 p-2 font-primary text-light";

	const flexClasses = "flex gap-5 items-center";
	return (
		<button
			{...rest}
			type={props.type}
			class={clsx([
				globalClasses,
				local.color ? colorClases[local.color] : colorClases.green,
				local.icons ? flexClasses : "",
			])}
		>
			{local.icons && IconClasses[local.icons]?.()}
			{local.children}
		</button>
	);
}

interface ActionButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	children: JSX.Element;
	color?: ActionButtonColor;
}

export function ActionButton(props: ActionButtonProps) {

	const [local, rest] = splitProps(props, ["color"])

	const colorClases: Record<ActionButtonColor, string> = {
		black: "bg-background-primary hover:bg-background-primary/90 text-light",
		gray: "bg-background-muted hover:bg-background-muted/90 text-dark/50",
		outline: "bg-background-base/90 border border-slate-marked text-dark "
	};

	const globalClasses = "rounded-xl pl-5 pr-5 p-2 font-base-bold shadow-xs shadow-background-primary";

	return (
		<button {...rest} type="button" class={clsx([colorClases, globalClasses, local.color ? colorClases[local.color] : colorClases["black"]])}>
			{props.children}</button>
	)
}

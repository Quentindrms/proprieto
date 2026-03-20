import clsx from "clsx";
import {
	FaRegularPenToSquare,
	FaSolidPlus,
	FaSolidRemove,
} from "solid-icons/fa";
import { type JSX, splitProps } from "solid-js";
import type { ButtonColor, ButtonIcons } from "../types/styleTypes";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	type: "submit" | "button" | "menu";
	children: JSX.Element;
	color?: ButtonColor;
	icons?: ButtonIcons;
}

export function Button(props: ButtonProps) {
	const [local, rest] = splitProps(props, ["color", "icons", "children"]);

	const colorClases: Record<ButtonColor, string> = {
		green: "bg-solid-green hover:bg-solid-green-hover",
		red: "bg-solid-red hover:bg-solid-red-hover",
		blue: "bg-solid-blue hover:bg-solid-blue-hover",
		gold: "bg-solid-gold hover:bg-solid-gold-hover",
	};

	const IconClasses: Record<string, () => JSX.Element> = {
		add: () => <FaSolidPlus size={25} color="" />,
		edit: () => <FaRegularPenToSquare size={25} />,
		delete: () => <FaSolidRemove size={25} />,
	};

	const globalClasses =
		"w-fit h-fit rounded-xl p-2 text-primary font-bold font-title";

	const flexClasses = "flex gap-5 items-center";
	return (
		<button
			{...rest}
			type={props.type}
			class={clsx([
				globalClasses,
				local.color ? colorClases[local.color] : colorClases.gold,
				local.icons ? flexClasses : "",
			])}
		>
			{local.icons && IconClasses[local.icons]?.()}
			{local.children}
		</button>
	);
}

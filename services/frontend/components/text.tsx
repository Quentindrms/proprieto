import clsx from "clsx";
import type { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { TextComponents, TextSize } from "../types/styleTypes";

interface TextProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
	children: JSX.Element;
	components?: TextComponents;
	bold?: boolean;
	size?: TextSize;
}

export default function Text(props: TextProps) {
	const globalClasses = "font-base-medium";

	const sizeClasses: Record<TextSize, string> = {
		"extra-small": "text-2xs",
		small: "text-xs",
		base: "text-md",
		medium: "text-lg",
		large: "text-xl",
		"extra-large": "text-2xl",
		big: "text-3xl",
	};

	return (
		<Dynamic
			class={clsx([
				globalClasses,
				props.bold ? "font-bold" : "",
				props.size ? sizeClasses[props.size] : sizeClasses.base,
				props.class,
			])}
			component={props.components ? props.components : "p"}
		>
			{props.children}
		</Dynamic>
	);
}

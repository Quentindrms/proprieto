import clsx from "clsx";
import type { JSX, JSXElement } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { HeadingColor, HeadingComponents, TextSize } from "../types/styleTypes";

interface HeadingProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
    size: TextSize;
    components: HeadingComponents;
    children: JSXElement;
    color?: HeadingColor,
}

export default function Heading(props: HeadingProps) {

    const sizeClasses: Record<TextSize, string> = {
        "extra-small": "text-2xs",
        small: "text-xs",
        base: "text-md",
        medium: "text-lg",
        large: "text-xl",
        "extra-large": "text-2xl",
        big: "text-3xl",
    }

    const colorCLasses: Record<HeadingColor, string> = {
        green: "text-action-green",
        red: "text-action-red",
        blue: "text-action-blue",
        black: "text-deep-neutral",
        white: "text-slate-500",
    }

    const globalClasses = "font-base-extrabold"

    return (
        <Dynamic component={props.components} class={clsx([globalClasses, sizeClasses[props.size], props.color ? colorCLasses[props.color] : colorCLasses.black])}>
            {props.children}
        </Dynamic>
    );
}

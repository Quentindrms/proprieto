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
        "extra-small": "text-extra-small",
        small: "text-small",
        base: "text-base",
        medium: "text-medium",
        large: "text-large",
        "extra-large": "text-extra-large",
        big: "text-big",
    }

    const colorCLasses: Record<HeadingColor, string> = {
        green: "text-solid-green",
        red: "text-solid-red",
        blue: "text-solid-blue",
        gold: "text-brand",
        white: "text-primary",
    }

    const globalClasses = "font-title font-bold p-1"

    return (
        <Dynamic component={props.components} class={clsx([globalClasses, sizeClasses[props.size], props.color ? colorCLasses[props.color] : colorCLasses.gold])}>
            {props.children}
        </Dynamic>
    );
}

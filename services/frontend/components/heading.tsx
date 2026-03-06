import clsx from "clsx";
import type { JSXElement } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { HeadingComponents, TextSize } from "../types/styleTypes";

interface HeadingProps {
    size: TextSize;
    components: HeadingComponents;
    children: JSXElement;
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

    const globalClasses = "font-title"

    return (
        <Dynamic component={props.components} class={clsx([globalClasses, sizeClasses[props.size]])}>
            {props.children}
        </Dynamic>
    );
}

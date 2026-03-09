import clsx from "clsx";
import type { JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { TextComponents, TextSize } from "../types/styleTypes";

interface TextProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
    children: JSX.Element;
    components: TextComponents;
    bold?: boolean,
    size?: TextSize
}

export default function Text(props: TextProps) {
    const globalClasses = "text-primary font-sans text-base";

    const sizeClasses: Record<TextSize, string> = {
        "extra-small": "text-extra-small",
        small: "text-small",
        base: "text-base",
        medium: "text-medium",
        large: "text-large",
        "extra-large": "text-extra-large",
        big: "text-big",
    }

    return (
        <Dynamic class={clsx(
            [globalClasses, props.bold ? 'font-bold' : '',
                props.size ? sizeClasses[props.size] : sizeClasses.base,
                props.class])} component={props.components}>
            {props.children}
        </Dynamic>
    );
}

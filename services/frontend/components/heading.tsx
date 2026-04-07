import clsx from "clsx";
import { type JSX, type JSXElement, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type {
    FontType,
    HeadingColor,
    HeadingComponents,
    TextSize,
} from "../types/styleTypes";

interface HeadingProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
    size: TextSize;
    components: HeadingComponents;
    children: JSXElement;
    color?: HeadingColor;
    fontClasses?: FontType;
}

export default function Heading(props: HeadingProps) {
    const [rest, local] = splitProps(props, [
        "size",
        "components",
        "color",
        "fontClasses",
    ]);

    const sizeClasses: Record<TextSize, string> = {
        "extra-small": "text-2xs",
        small: "text-xs",
        base: "text-md",
        medium: "text-lg",
        large: "text-xl",
        "extra-large": "text-2xl",
        big: "text-3xl",
    };

    const colorCLasses: Record<HeadingColor, string> = {
        green: "text-action-green",
        red: "text-action-red",
        blue: "text-action-blue",
        black: "text-deep-neutral",
        white: "text-slate-500",
        gray: "text-muted-text",
    };

    const fontClasses: Record<FontType, string> = {
        "extra-bold": "font-base-extrabold",
        bold: "font-base-bold",
        medium: "font-base-medium",
        regular: "font-base-regular",
    };

    const globalClasses = "";

    return (
        <Dynamic component={props.components} class={clsx(local.class, globalClasses, sizeClasses[props.size], props.color ? colorCLasses[props.color] : colorCLasses.black, props.fontClasses ? fontClasses[props.fontClasses] : fontClasses["medium"])}>
            {props.children}
        </Dynamic>
    );
}

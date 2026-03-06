import clsx from "clsx";
import { type JSX, splitProps } from "solid-js";
import type { ButtonColor } from "../types/styleTypes";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    type: "submit" | "button" | "menu";
    children: JSX.Element;
    color?: ButtonColor,
}

export default function Button(props: ButtonProps) {
    const colorClases: Record<ButtonColor, string> = {
        green: "bg-solid-green hover:bg-solid-green-hover",
        red: "bg-solid-red hover:bg-solid-red-hover",
        blue: "bg-solid-blue hover:bg-solid-blue-hover",
        gold: "bg-solid-gold hover:bg-solid-gold-hover",
    };

    const globalClasses = " w-fit rounded-xl p-2 text-primary font-bold font-title";
    return (
        <button type={props.type}
            class={clsx([
                globalClasses,
                props.color ? colorClases[props.color] : colorClases.gold])}
        >
            {props.children}
        </button>
    );
}

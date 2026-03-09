import clsx from "clsx";
import type { JSX } from "solid-js";
import type { BadgeColor } from "../types/styleTypes";

interface BadgeProps {
    color: BadgeColor;
    children: JSX.Element;
}

export function Badge(props: BadgeProps) {
    const colorClases: Record<BadgeColor, string> = {
        green: "bg-badge-green",
        red: "bg-badge-red",
        blue: "bg-badge-blue",
        gold: "bg-badge-gold",
    };

    const globalClasses = "text-small text-primary font-sans w-fit p-2 rounded-xl";

    return (
        <div
            class={clsx([
                globalClasses,
                colorClases[props.color
                ]])}
        >
            {props.children}
        </div>);
}

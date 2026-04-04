import clsx from "clsx";
import type { JSX } from "solid-js";
import type { BadgeColor } from "../types/styleTypes";

interface BadgeProps {
    color: BadgeColor;
    children: JSX.Element;
}

export function Badge(props: BadgeProps) {
    const colorClases: Record<BadgeColor, string> = {
        success: "bg-action-green text-green-800",
        error: "bg-action-red text-dark text-red-800",
        primary: "bg-background-primary text-light",
        warning: "bg-action-orange text-amber-800"
    };

    const globalClasses = "w-fit h-fit font-base-medium p-4 rounded-full";

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

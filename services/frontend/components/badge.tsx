import clsx from "clsx";
import { type JSX, splitProps } from "solid-js";
import type { BadgeColor, ButtonColor } from "../types/styleTypes";

interface BadgeProps {
    color: BadgeColor;
    children: JSX.Element;
}

export function Badge(props: BadgeProps) {
    const colorClases: Record<BadgeColor, string> = {
        success: "bg-action-green text-green-800 font-base-extrabold",
        error: "bg-action-red text-dark text-red-800 font-base-extrabold",
        primary: "bg-background-primary text-light font-base-extrabold",
        warning: "bg-action-orange text-amber-800 font-base-extrabold",
    };

    const globalClasses =
        "w-fit h-fit pl-4 pr-4 pb-2 pt-2 rounded-full shadow-xs shadow-background-muted";

    return (
        <div class={clsx([globalClasses, colorClases[props.color]])}>
            {props.children}
        </div>
    );
}

interface ButtonBadgeProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    color: BadgeColor;
    children: JSX.Element;
    onClick: () => void;
}

export function ButtonBadge(props: ButtonBadgeProps) {
    const [local, rest] = splitProps(props, ["color", "children"]);

    const colorClases: Record<BadgeColor, string> = {
        success: "bg-action-green text-green-800 font-base-extrabold",
        error: "bg-action-red text-dark text-red-800 font-base-extrabold",
        primary: "bg-background-primary text-light font-base-extrabold",
        warning: "bg-action-orange text-amber-800 font-base-extrabold",
    };

    const globalClasses =
        "w-fit h-fit pl-4 pr-4 pb-2 pt-2 rounded-full shadow-xs shadow-background-muted";

    return (
        <div class={clsx([globalClasses, colorClases[props.color]])}>
            {props.children}
        </div>
    );


}

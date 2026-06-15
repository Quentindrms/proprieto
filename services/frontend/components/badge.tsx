import clsx from "clsx";
import { type JSX, Show, splitProps } from "solid-js";
import type { BadgeColor } from "../types/styleTypes";
import type { ContractStatus } from "./rows";

interface BadgeProps {
    color: BadgeColor;
    children: JSX.Element;
}

export function Badge(props: BadgeProps) {
    const colorClases: Record<BadgeColor, string> = {
        success:
            "bg-action-green/65 border border-action-green text-green-900 font-base-extrabold backdrop-blur-md",
        error:
            "bg-action-red/65 border-action-red text-dark text-red-900 font-base-extrabold",
        primary:
            "bg-background-primary/65 border-background-primary text-light font-base-extrabold",
        warning:
            "bg-action-orange/65 text-orange-900 border border-action-orange font-base-extrabold",
    };

    const globalClasses =
        "w-fit h-fit pl-4 pr-4 pb-2 pt-2 rounded-full shadow-md hover:-translate-x-1 transition-transform";

    return (
        <div class={clsx([globalClasses, colorClases[props.color]])}>
            {props.children}
        </div>
    );
}

export function BadgeBoard(props: BadgeProps) {
    const colorClases: Record<BadgeColor, string> = {
        success:
            "bg-action-green/65 border border-action-green text-green-900 font-base-extrabold backdrop-blur-md",
        error:
            "bg-action-red/65 border-action-red text-dark text-red-900 font-base-extrabold",
        primary:
            "bg-background-primary/65 border-background-primary text-light font-base-extrabold",
        warning:
            "bg-action-orange/65 text-orange-900 border border-action-orange font-base-extrabold",
    };

    const globalClasses =
        "w-40 text-center h-fit pl-4 pr-4 pb-2 pt-2 rounded-full shadow-md hover:-translate-x-1 transition-transform";

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
    effect?: boolean;
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
        "w-3xs md:w-fit h-fit pl-4 pr-4 pb-2 pt-2 rounded-full shadow-xs shadow-background-muted";

    return (
        <button
            class={clsx([
                globalClasses,
                colorClases[local.color],
                props.effect ? "hover:-translate-y-0.5 transition-transform" : "",
            ])}
            {...rest}
        >
            {local.children}
        </button>
    );
}

interface StatusBadgeProps {
    status: ContractStatus;
}

export function StatusBadge(props: StatusBadgeProps) {
    const colorClases: Record<BadgeColor, string> = {
        success:
            "bg-action-green/65 border border-action-green text-green-900 font-base-extrabold backdrop-blur-md",
        error:
            "bg-action-red/65 border-action-red text-dark text-red-900 font-base-extrabold",
        primary:
            "bg-background-primary/65 border-background-primary text-light font-base-extrabold",
        warning:
            "bg-action-orange/65 text-orange-900 border border-action-orange font-base-extrabold",
    };

    const globalClasses =
        "w-40 text-center h-fit pl-4 pr-4 pb-2 pt-2 rounded-full shadow-md hover:-translate-x-1 transition-transform";

    return (
        <>
            <Show when={props.status === "active"}>
                <div class={clsx([globalClasses, colorClases["success"]])}>
                    En cours
                </div>
            </Show>

            <Show when={props.status === "expired"}>
                <div class={clsx([globalClasses, colorClases["error"]])}>
                    Expiré
                </div>
            </Show>

            <Show when={props.status === "expiring"}>
                <div class={clsx([globalClasses, colorClases["warning"]])}>
                    Expire bientôt
                </div>
            </Show>

            <Show when={props.status === "startSoon"}>
                <div class={clsx([globalClasses, colorClases["warning"]])}>
                    Débute prochainement
                </div>
            </Show>

        </>
    );
}
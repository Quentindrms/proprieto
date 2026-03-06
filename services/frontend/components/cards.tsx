import clsx from "clsx";
import type { AccentColor } from "../types/styleTypes";
import Text from "./text";

interface StatCardProps {
    title?: string;
    legend: string;
    value: string;
    accentColor?: AccentColor;
}

export function StatCard(props: StatCardProps) {

    const colorClasses: Record<AccentColor, string> = {
        green: "text-solid-green",
        red: "text-solid-red",
        blue: "text-solid-blue",
        gold: "text-solid-gold",
    };


    return (
        <div class="flex flex-col gap-2 border border-background-border bg-background-surface w-fit rounded-2xl pt-2 pb-2 pl-4 pr-4">
            <Text components="p" size="medium">{props.title}</Text>
            <Text
                components="p"
                class={clsx([props.accentColor ? colorClasses[props.accentColor] : "",])}
                size="large"
            >
                {props.value}
            </Text>
            <Text components="p"
                bold>{props.legend}</Text>
        </div>
    );
}

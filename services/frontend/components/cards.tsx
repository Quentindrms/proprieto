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
        <div class="flex flex-col gap-2 border border-background-border bg-background-surface w-fit rounded-2xl pt-2 pb-2 pl-4 pr-4 shadow-md shadow-background-surface">
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

interface BasicCardProps {
    title: string,
    stat?: string,
}

export function BasicCard(props: BasicCardProps) {

    return (
        <div class="flex flex-col gap-2 border border-background-border bg-background-surface w-xs
        rounded-xl">
            <div id="card-header"
                class="flex justify-between border-b border-background-border
                items-center p-2">
                <Text components="p" size="medium">{props.title}</Text>
                <Text components="p"
                    size="medium">{props.stat}</Text>
            </div>
            <div class="p-2">
                <ul class="list-none">
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                </ul>
            </div>
        </div>
    )
}

interface LargeCardProps {
    title: string
}

export function LargeCard(props: LargeCardProps) {

    return (
        <div class="flex flex-col gap-2 border border-background-border bg-background-surface w-xl
        rounded-xl">
            <div id="card-header"
                class="flex justify-between border-b border-background-border
                items-center p-2">
                <Text components="p" size="medium">{props.title}</Text>
                {/** TODO: ADD FILTER COMPONENTS */}
            </div>
            <div class="p-2">
                <ul class="list-none">
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                </ul>
            </div>
        </div>
    )
}



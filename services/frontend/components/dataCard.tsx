import clsx from "clsx";
import { createMemo } from "solid-js";
import Heading from "./heading";
import Text from "./text";

interface CardRevenueProps {
    title: string;
    stat: number;
    comment?: string;
    dynamic?: boolean;
}

export function CardRevenue(props: CardRevenueProps) {
    const globalClasses =
        "p-2 w-2xs border-2 border-slate-marked background-base rounded-xl flex flex-col gap-1 shadow-xs shadow-background-muted";
    const colorText = getDynamicTextColor();

    function getDynamicTextColor() {
        if (props.dynamic && props.stat > 0) {
            return "text-action-green"
        }
        else if (props.dynamic && props.stat < 0) {
            return "text-action-red"
        }
        else {
            return "text-action-green"
        }
    }

    return (
        <div class={clsx([globalClasses])}>
            <Heading components="h2" size="medium" color="gray">{props.title}</Heading>
            <p class="font-base-extrabold text-3xl">{props.stat}$</p>
            {props.comment && <Text size="small" class={clsx([colorText, "font-base-bold"])}>{props.comment}</Text>}
        </div>
    )
}

interface CardProgressionBarProps {
    title: string;
    value: number;
    min?: number;
    max?: number;
}

export function CardProgressionBar(props: CardProgressionBarProps) {
    const globalClasses =
        "p-2 w-2xs border-2 border-slate-marked background-base rounded-xl flex flex-col gap-1 shadow-xs shadow-background-muted";

    const progress = createMemo(() => {
        const min = props.min ?? 0;
        const max = props.max ?? 100;
        const clamped = Math.min(Math.max(props.value, min), max);
        return ((clamped - min) / (max - min)) * 100;
    });

    return (
        <div class={clsx([globalClasses])}>
            <Heading components="h2" size="medium" color="gray">{props.title}</Heading>
            <div class="border border-slate-marked rounded-full bg-slate-marked">
                <div
                    class="h-5 rounded-full bg-action-green"
                    style={{ width: `${progress()}%` }}
                ></div>
            </div>
        </div>
    )
}

interface CardTicketProps {
    title: string,
    value: string,
    urgent: string,
}

export function CardTicket(props: CardTicketProps) {
    const globalClasses =
        "p-2 w-2xs border-2 border-slate-marked background-base rounded-xl flex flex-col gap-1 shadow-xs shadow-background-muted";
    return (
        <div class={clsx([globalClasses])}>
            <Heading components="h2" size="medium" color="gray">{props.title}</Heading>
            <p class="font-base-extrabold text-3xl">{props.value}</p>
            <Text size="small" class={clsx(["font-base-bold"])}>{props.urgent} demande urgente</Text>
        </div>
    )
}


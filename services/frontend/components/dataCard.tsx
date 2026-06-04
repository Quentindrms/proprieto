import clsx from "clsx";
import { differenceInCalendarDays } from "date-fns";
import { createMemo, Show } from "solid-js";
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
        "p-2 w-2xs border-2 border-slate-marked background-base rounded-xl flex flex-col justify-center gap-1 shadow-md/50 shadow-background-muted bg-background-base";
    const colorText = createMemo(() => {
        if (props.dynamic && props.stat < 0) {
            return "text-action-red";
        }
        return "text-action-green";
    });

    return (
        <div class={clsx([globalClasses])}>
            <Heading components="h2" size="medium" color="gray">
                {props.title}
            </Heading>
            <p class="font-base-extrabold text-3xl">
                {Intl.NumberFormat("fr-FR").format(props.stat)} €
            </p>
            {props.comment && (
                <Text size="small" class={clsx([colorText(), "font-base-bold"])}>
                    {props.comment}
                </Text>
            )}
        </div>
    );
}

interface CardInfoProps {
    title: string;
    stat: number;
}

export function CardInfo(props: CardInfoProps) {
    const globalClasses =
        "h-xs p-2 w-2xs border-2 border-slate-marked background-base rounded-xl flex flex-col justify-center gap-1 shadow-md/50 shadow-background-muted bg-background-base";

    return (
        <div class={clsx([globalClasses])}>
            <Heading components="h2" size="medium" color="gray">
                {props.title}
            </Heading>
            <p class="font-base-extrabold text-3xl">
                {Intl.NumberFormat("fr-FR").format(props.stat)} €
            </p>
        </div>
    );
}

interface CardProgressionBarProps {
    title: string;
    value: number;
    style: "light" | "dark";
    size: "normal" | "large";
    min?: number;
    max?: number;
}

export function CardProgressionBar(props: CardProgressionBarProps) {
    const globalClasses = (size: string) => {
        if (size === "normal") {
            return "p-2 w-2xs rounded-xl flex flex-col justify-center gap-2 shadow-xs shadow-background-muted";
        }
        return "p-2 w-2xs h-[10rem] rounded-xl flex flex-col justify-center gap-2 shadow-xs shadow-background-muted";
    };

    const styleClasse = (style: string): string => {
        if (style === "light") {
            return "bg-background-base text-muted-text";
        }
        return "bg-deep-neutral text-light";
    };

    const progress = createMemo(() => {
        const min = props.min ?? 0;
        const max = props.max ?? 100;
        const clamped = Math.min(Math.max(props.value, min), max);
        return ((clamped - min) / (max - min)) * 100;
    });

    return (
        <div class={clsx([globalClasses(props.size), styleClasse(props.style)])}>
            <Show
                when={props.style === "light"}
                fallback={
                    <Heading components="h2" size="medium" color="white">
                        {props.title}
                    </Heading>
                }
            >
                <Heading components="h2" size="large" color="black" class="font-bold">
                    {props.title}
                </Heading>
            </Show>

            <div class="border border-slate-marked rounded-full bg-slate-marked">
                <div
                    class="h-5 rounded-full bg-action-green/70"
                    style={{ width: `${progress()}%` }}
                ></div>
            </div>
        </div>
    );
}

interface CardTicketProps {
    title: string;
    value: string;
    urgent: string;
}

export function CardTicket(props: CardTicketProps) {
    const globalClasses =
        "p-2 w-2xs border-2 border-slate-marked background-base rounded-xl flex flex-col gap-1 shadow-xs shadow-background-muted";
    return (
        <div class={clsx([globalClasses])}>
            <Heading components="h2" size="medium" color="gray">
                {props.title}
            </Heading>
            <p class="font-base-extrabold text-3xl">{props.value}</p>
            <Text size="small" class={clsx(["font-base-bold"])}>
                {props.urgent} demande urgente
            </Text>
        </div>
    );
}

interface CurrentContractCardProps {
    endDate?: Date;
    client?: string;
}

export function CurrentContractCard(props: CurrentContractCardProps) {
    let dayLeft: number;
    if (props.endDate) {
        dayLeft = differenceInCalendarDays(props.endDate, new Date());
    }
    else {
        dayLeft = 0
    }

    return (
        <div class="w-xs flex flex-col p-4 bg-background-base rounded-xl gap-4 shadow-xs shadow-background-muted hover:-translate-y-1 transition-transform">
            <Heading components="h3" size="large" fontClasses="medium">
                Contrat en cours :
            </Heading>
            <Show when={props.endDate && props.client} fallback={<Text>Aucun contrat en cours pour le moment</Text>} >
                <Text>{props.client}</Text>
                <Text>
                    Se termine le {props.endDate ? new Date(props.endDate).toLocaleDateString("fr-FR") : ""}
                    <Show when={dayLeft < 100}>
                        <span class="italic">
                            ({dayLeft} {dayLeft > 1 ? "jours" : "jour"})
                        </span>
                    </Show>
                </Text>
            </Show>
        </div>
    );
}

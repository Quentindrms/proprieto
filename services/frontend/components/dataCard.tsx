import clsx from "clsx";
import { stat } from "fs";
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
        "w-2xs border border-slate-marked background-base rounded-xl flex flex-col gap-1";

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
            <Text size="extra-large" bold class="pl-4">{props.stat}$</Text>
            {props.comment && <Text size="small" class={clsx([colorText, "font-base-bold"])}>{props.comment}</Text>}
        </div>
    )
}

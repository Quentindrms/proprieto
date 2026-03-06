import clsx from "clsx";
import { createMemo } from "solid-js";
import Heading from "./heading";
import Text from "./text";

interface ProgressBarProps {
    label: string;
    value: number;
}

export default function ProgressBar(props: ProgressBarProps) {
    const progress = createMemo(() => Math.min(Math.max(props.value, 0), 100));

    return (
        <div class="w-xs">
            <Heading components="h6" size="medium" color="white">
                {props.label}
            </Heading>
            <div class="border border-background-border rounded-full">
                <div
                    id="progress"
                    class={clsx([`h-5 rounded-full bg-solid-gold `])}
                    style={{ width: `${progress()}%` }}
                ></div>
            </div>
        </div>
    );
}

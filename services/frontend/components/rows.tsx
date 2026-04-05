import { BsArrowUpRightCircleFill } from "solid-icons/bs";
import Heading from "./heading";
import Text from "./text";

interface TransactionRowProps {
    name: string;
    recipient: string;
    amount: string;
    income: boolean;
}

export default function TransactionRow(props: TransactionRowProps) {
    return (
        <div class="flex gap-2 items-center p-2 bg-background-base w-md">
            <BsArrowUpRightCircleFill class="m-2" size={35} color="var(--color-action-green)" />
            <div class="text-left p-2">
                <Heading components="h3" size="medium">
                    {props.name}
                </Heading>
                <Text size="large">{props.recipient}</Text>
            </div>
            <Text size="large">{props.amount}€</Text>
        </div>
    );
}

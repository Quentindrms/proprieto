import {
    BsArrowDownRightCircleFill,
    BsArrowUpRightCircleFill,
} from "solid-icons/bs";
import Heading from "./heading";
import Text from "./text";

interface TransactionRowProps {
    name: string;
    recipient: string;
    amount: string;
    income: boolean;
    date: Date;
}

export default function TransactionRow(props: TransactionRowProps) {
    return (
        <div class="flex gap-3 items-center p-2 bg-background-base w-md">
            {props.income ? <BsArrowUpRightCircleFill class="m-2" size={35} color="var(--color-action-green)" /> : <BsArrowDownRightCircleFill class="m-2" size={35} color="var(--color-action-red)" />}
            <div class="text-left p-2">
                <Heading components="h3" size="medium">
                    {props.name}
                </Heading>
                <Text size="large">{props.recipient}</Text>
            </div>
            <div class="p-1">
                <Text size="large" >{props.income ? "+" : "-"}{props.amount}€</Text>
                <Text size="small" >{new Date(props.date).toLocaleDateString("fr-FR")}</Text>
            </div>
        </div>
    );
}

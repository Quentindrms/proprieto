import {
    BsArrowDownRightCircleFill,
    BsArrowUpRightCircleFill,
} from "solid-icons/bs";
import { Badge } from "./badge";
import Heading from "./heading";
import Text from "./text";

export type TransactionType = "income" | "outcome";

export interface TransactionRowData {
    name: string;
    amount: number;
    type: TransactionType;
    isPaid: boolean;
}

export default function TransactionRow(props: TransactionRowData) {
    const isIncome = () => props.type === "income";

    return (
        <tr class="last:border-0 hover:bg-background-secondary transition-colors">
            <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                    {isIncome()
                        ? <BsArrowUpRightCircleFill size={28} color="var(--color-action-green)" />
                        : <BsArrowDownRightCircleFill size={28} color="var(--color-action-red)" />
                    }
                    <Heading components="h3" size="medium">{props.name}</Heading>
                </div>
            </td>
            <td class="px-4 py-3 text-right">
                <Text size="large">
                    {isIncome() ? "+" : "-"}{props.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </Text>
            </td>
            <td class="px-4 py-3">
                <Badge color={isIncome() ? "success" : "error"}>
                    {isIncome() ? "Entrée" : "Sortie"}
                </Badge>
            </td>
            <td class="px-4 py-3">
                <Badge color={props.isPaid ? "success" : "warning"}>
                    {props.isPaid ? "Payé" : "En attente"}
                </Badge>
            </td>
        </tr>
    );
}

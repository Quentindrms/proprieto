import {
    BsArrowDownRightCircleFill,
    BsArrowUpRightCircleFill,
} from "solid-icons/bs";
import { FaSolidEdit, FaSolidTrashCan } from "solid-icons/fa";
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
                    {isIncome() ? (
                        <BsArrowUpRightCircleFill
                            size={28}
                            color="var(--color-action-green)"
                        />
                    ) : (
                        <BsArrowDownRightCircleFill
                            size={28}
                            color="var(--color-action-red)"
                        />
                    )}
                    <Heading components="h3" size="medium">
                        {props.name}
                    </Heading>
                </div>
            </td>
            <td class="px-4 py-3 text-right">
                <Text size="large">
                    {isIncome() ? "+" : "-"}
                    {props.amount.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                    })}
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

export type ContractStatus = "active" | "expiring" | "expired";

export interface ContractRowData {
    clientName: string;
    propertyName: string;
    period: string;
    loan: number;
    status: ContractStatus;
}

export function ContractRow(props: ContractRowData) {
    return (
        <tr class="last:border-0 hover:bg-background-muted/10 transition-colors">
            <td class="px-4 py-3">
                <Heading components="h3" size="medium">
                    {props.clientName}
                </Heading>
            </td>
            <td class="px-4 py-3">
                <Text size="medium">{props.propertyName}</Text>
            </td>
            <td class="px-4 py-3">
                <Text size="medium">{props.period}</Text>
            </td>
            <td class="px-4 py-3 text-right">
                <Text size="large">
                    {props.loan.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                    })}
                </Text>
            </td>
            <td class="px-4 py-3">
                <Badge
                    color={
                        props.status === "active"
                            ? "success"
                            : props.status === "expiring"
                                ? "warning"
                                : "error"
                    }
                >
                    {props.status === "active"
                        ? "Actif"
                        : props.status === "expiring"
                            ? "Expire bientôt"
                            : "Expiré"}
                </Badge>
            </td>
        </tr>
    );
}

export interface FluxRowData {
    id: string;
    name: string;
    category: string;
    issueDate: string;
    amount: string;
    type: "outcome" | "income";
    onClick: (item: Omit<FluxRowData, "onClick">) => void;
}

export function FluxRow(props: FluxRowData) {

    return (
        <tr class="last:border-0 hover:bg-background-muted/10 transition-colors" onClick={() => props.onClick({ id: props.id, name: props.name, category: props.category, issueDate: props.issueDate, amount: props.amount, type: props.type })}>
            <td class="px-4 py-3">
                <Heading components="h3" size="medium">
                    {props.name}
                </Heading>
            </td>
            <td class="px-4 py-3">
                <Text size="medium">{props.category}</Text>
            </td>
            <td class="px-4 py-3">
                <Text size="medium">{props.issueDate}</Text>
            </td>
            <td class="px-4 py-3">
                <Text size="medium">{props.amount}€</Text>
            </td>
            <td class="px-4 py-3">
                <div class="flex gap-5">
                    <FaSolidEdit size={25} color="var(--color-dark)" />
                    <FaSolidTrashCan size={25} color="var(--color-action-red)" />
                </div>
            </td>
        </tr>
    )
}

export interface ContractorRowData {
    name: string;
    speciality: string;
    phone: string;
    mail: string;
}

export function ContractorRow(props: ContractorRowData) {
    return (
        <tr class="last:border-0 hover:bg-background-secondary transition-colors hover:bg-background-muted/10">
            <td class="px-4 py-3">
                <Heading components="h3" size="medium" fontClasses="bold">{props.name}</Heading>
            </td>
            <td class="px-4 py-3">
                <Text size="medium">{props.speciality}</Text>
            </td>
            <td class="px-4 py-3">
                <div class="flex flex-col">
                    <Text size="medium">{props.phone}</Text>
                    <Text size="medium" class="italic text-muted-text">{props.mail}</Text>
                </div>
            </td>
            <td class="px-4 py-3">
                <div class="flex gap-5">
                    <FaSolidEdit class="cursor-pointer" size={25} color="var(--color--dark)" />
                    <FaSolidTrashCan class="cursor-pointer" size={25} color="var(--color-action-red)" />
                </div>
            </td>
        </tr>

    )
}

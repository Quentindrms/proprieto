import clsx from "clsx";
import {
    BsArrowDownRightCircleFill,
    BsArrowUpRightCircleFill,
} from "solid-icons/bs";
import { Badge } from "./badge";
import Heading from "./heading";
import Text from "./text";

export type TransactionType = "income" | "outcome";

export interface TransactionRowData {
    id: string;
    name: string;
    amount: number;
    type: TransactionType;
    isPaid: boolean;
    issueDate: Date;
}

export default function TransactionRow(props: TransactionRowData) {
    const isIncome = () => props.type === "income";

    return (
        <tr class="last:border-0 hover:bg-background-muted/10 transition-colors">
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
            <td class="px-4 py-3">
                <Text size="large">
                    {new Date(props.issueDate).toLocaleDateString("fr-FR")}
                </Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="large">
                    {isIncome() ? "+" : "-"}
                    {props.amount.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                    })}
                </Text>
            </td>
            <td class="px-4 py-3">
                <div class="flex justify-center">
                    <Badge color={isIncome() ? "success" : "error"}>
                        {isIncome() ? "Revenu" : "Dépense"}
                    </Badge>
                </div>
            </td>
            <td class="px-4 py-3">
                <div class="flex justify-center">
                    <Badge color={props.isPaid ? "success" : "warning"}>
                        {props.isPaid ? "Payé" : "En attente"}
                    </Badge>
                </div>
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
                <Text size="medium" bold>{props.period}</Text>
            </td>
            <td class="px-4 py-3 text-right">
                <Text size="large" bold>
                    {props.loan.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                    })}
                </Text>
            </td>
            <td class="px-4 py-3 flex">
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
    amount: number;
    type: "outcome" | "income";
    onClick: (item: Omit<FluxRowData, "onClick">) => void;
}

export function FluxRow(props: FluxRowData) {
    return (
        <tr
            class="last:border-0 hover:bg-background-muted/10 transition-colors"
            onClick={() =>
                props.onClick({
                    id: props.id,
                    name: props.name,
                    category: props.category,
                    issueDate: props.issueDate,
                    amount: props.amount,
                    type: props.type,
                })
            }
        >
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
                <Text
                    size="medium"
                    class={clsx([props.type === "income" ? "text-action-green" : "text-action-red"])}
                    bold
                >
                    {Intl.NumberFormat("fr-FR").format(props.amount)}€
                </Text>
            </td>
        </tr>
    );
}

export interface ContractorRowData {
    name: string;
    speciality: string;
    phone: string;
    mail: string;
    onClick: () => void;
}

export function ContractorRow(props: ContractorRowData) {
    return (
        <tr
            class="last:border-0 hover:bg-background-secondary transition-colors hover:bg-background-muted/10"
            onClick={props.onClick}
        >
            <td class="px-4 py-3">
                <Heading components="h3" size="medium" fontClasses="bold">
                    {props.name}
                </Heading>
            </td>
            <td class="px-4 py-3">
                <Text size="medium">{props.speciality}</Text>
            </td>
            <td class="px-4 py-3">
                <div class="flex flex-col">
                    <Text size="medium">{props.phone}</Text>
                    <Text size="medium" class="italic text-muted-text">
                        {props.mail}
                    </Text>
                </div>
            </td>
        </tr>
    );
}

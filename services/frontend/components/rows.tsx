import clsx from "clsx";
import {
    BsArrowDownRightCircleFill,
    BsArrowUpRightCircleFill,
} from "solid-icons/bs";
import { Show } from "solid-js";
import { Badge, BadgeBoard } from "./badge";
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
            <td class="px-4 py-3 text-center">
                <Text size="large" class="text-left">
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
                    <BadgeBoard color={isIncome() ? "success" : "error"}>
                        {isIncome() ? "Revenu" : "Dépense"}
                    </BadgeBoard>
                </div>
            </td>
            <td class="px-4 py-3">
                <div class="flex justify-center">
                    <BadgeBoard color={props.isPaid ? "success" : "warning"}>
                        {props.isPaid ? "Payé" : "En attente"}
                    </BadgeBoard>
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
    onClick: () => void;

}

export function ContractRow(props: ContractRowData) {
    return (
        <tr class="last:border-0 hover:bg-background-muted/10 transition-colors"
            onclick={props.onClick}
        >
            <td class="px-4 py-3 text-center">
                <Heading components="h3" size="medium">
                    {props.clientName}
                </Heading>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{props.propertyName}</Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium" bold>
                    {props.period}
                </Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="large" bold>
                    {props.loan.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                    })}
                </Text>
            </td>
            <td class="px-4 py-3 flex justify-center">
                <BadgeBoard
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
                </BadgeBoard>
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
    isPaid: boolean;
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
                    isPaid: props.isPaid,
                })
            }
        >
            <td class="px-4 py-3 text-center">
                <Heading components="h3" size="medium">
                    {props.name}
                </Heading>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{props.category}</Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{props.issueDate}</Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text
                    size="medium"
                    class={clsx([
                        props.type === "income" ? "text-action-green" : "text-action-red",
                    ])}
                    bold
                >
                    {Intl.NumberFormat("fr-FR").format(props.amount)}€
                </Text>
            </td>
            <td class="px-4 py-3 flex justify-center">
                <Show when={props.isPaid}
                    fallback={<BadgeBoard color="warning">En attente</BadgeBoard>}
                >
                    <BadgeBoard color="success">Payé</BadgeBoard>
                </Show>
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
            <td class="px-4 py-3 text-center">
                <Heading components="h3" size="medium" fontClasses="bold">
                    {props.name}
                </Heading>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{props.speciality}</Text>
            </td>
            <td class="px-4 py-3 text-center">
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

interface PropertyFluxRowProps {
    name: string,
    date: Date,
    amount: number,
    isPaid: boolean,
}

export function PropertyFluxRow(props: PropertyFluxRowProps) {

    return (
        <tr
            class="last:border-0 hover:bg-background-secondary transition-colors hover:bg-background-muted/10"
        >
            <td class="px-4 py-3 text-center">
                <Text size="medium">{props.name}</Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{props.date.toLocaleDateString("fr-FR")}</Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{Intl.NumberFormat("fr-FR").format(props.amount)} €</Text>
            </td>
            <td class="px-4 py-3 flex justify-center">
                <Show when={props.isPaid}
                    fallback={<Badge color="warning">En attente</Badge>}
                >
                    <Badge color="success">Payé</Badge>
                </Show>
            </td>
        </tr>
    )
}

interface PropertyClientRowProps {
    name: string,
    startDate: Date,
    endDate: Date,
    totalAmount: number,
}

export function PropertyClientRow(props: PropertyClientRowProps) {

    return (
        <tr
            class="last:border-0 hover:bg-background-secondary transition-colors hover:bg-background-muted/10"
        >
            <td class="px-4 py-3 text-center">
                <Text size="medium">{props.name}</Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{`${new Date(props.startDate).toLocaleDateString("fr-FR")} - ${new Date(props.endDate).toLocaleDateString("fr-FR")}`}</Text>
            </td>
            <td class="px-4 py-3 text-center">
                <Text size="medium">{Intl.NumberFormat("fr-FR").format(props.totalAmount)} €</Text>
            </td>
        </tr>
    )
}
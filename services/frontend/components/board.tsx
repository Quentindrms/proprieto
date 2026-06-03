import type { TitleBoardHeader } from "@app/types/board";
import clsx from "clsx";
import { For, type JSX } from "solid-js";
import Heading from "./heading";
import type { ContractStatus } from "./rows";

export function getContractStatus(endDate: Date | string): ContractStatus {
	const now = new Date();
	const end = new Date(endDate);
	const daysUntilExpiry =
		(end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
	if (end < now) return "expired";
	if (daysUntilExpiry <= 30) return "expiring";
	return "active";
}

interface BoardHeaderProps {
	title: TitleBoardHeader[];
}

function BoardHeader(props: BoardHeaderProps) {
	return (
		<thead class="border-b-2 border-background-muted/10">
			<tr>
				<For each={props.title}>
					{(title) => (
						<th class="pt-4 pb-3 text-center">
							<Heading components="h4" size="large">
								{title.label}
							</Heading>
						</th>
					)}
				</For>
			</tr>
		</thead>
	);
}

interface BoardBodyProps<T> {
	renderRow: (item: T) => JSX.Element;
	data: T[];
}

function BoardBody<T>(props: BoardBodyProps<T>) {
	return (
		<tbody class="bg-background-base">
			<For each={props.data}>{(item) => props.renderRow(item)}</For>
		</tbody>
	);
}

interface BoardProps<T> {
	header: BoardHeaderProps;
	body: BoardBodyProps<T>;
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const sizeClasses: Record<NonNullable<BoardProps<unknown>["size"]>, string> = {
	xs: "max-w-xs",
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	full: "max-w-full",
};

export function Board<T>(props: BoardProps<T>) {
	return (
		<div
			class={clsx([
				"w-full",
				props.size ? sizeClasses[props.size] : "max-w-full",
				"overflow-x-auto rounded-xl shadow-md bg-background-muted/10 border border-background-muted/50 shadow-muted-text",
			])}
		>
			<table class="w-full">
				<BoardHeader title={props.header.title} />
				<BoardBody data={props.body.data} renderRow={props.body.renderRow} />
			</table>
		</div>
	);
}

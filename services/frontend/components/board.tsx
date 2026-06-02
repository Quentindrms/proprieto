import type { TitleBoardHeader } from "@app/types/board";
import { createSignal, For, type JSX, Show } from "solid-js";
import { ButtonGroup } from "./button";
import Heading from "./heading";
import {
	ContractRow,
	type ContractStatus,
	FluxRow,
} from "./rows";


interface ContractBoardItem {
	clientName: string;
	propertyName: string;
	startDate: Date | string;
	endDate: Date | string;
	loan: number;
}

interface ContractBoardProps {
	contracts: ContractBoardItem[];
}

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
						<th class="px-4 py-3 text-left">
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
}

export function Board<T>(props: BoardProps<T>) {
	return (
		<div class="w-full overflow-x-auto rounded-xl shadow-md bg-background-muted/10 border border-background-muted/50 shadow-muted-text">
			<table class="w-full">
				<BoardHeader title={props.header.title} />
				<BoardBody data={props.body.data} renderRow={props.body.renderRow} />
			</table>
		</div>
	);
}

export function ContractBoard(props: ContractBoardProps) {
	const title: TitleBoardHeader[] = [
		{ label: "Client", slug: "client" },
		{ label: "Propriété", slug: "property" },
		{ label: "Période", slug: "duration" },
		{ label: "Loyer", slug: "loan" },
		{ label: "Statut", slug: "statut" },
	];

	return (
		<div class="w-90 md:w-xl lg:w-7xl overflow-x-auto rounded-xl shadow-md bg-background-muted/10 border border-background-muted/50 shadow-muted-text">
			<table class="w-full border-collapse">
				<BoardHeader title={title} />
				<tbody class="bg-background-base">
					<For each={props.contracts}>
						{(contract) => (
							<ContractRow
								clientName={contract.clientName}
								propertyName={contract.propertyName}
								period={`${new Date(contract.startDate).toLocaleDateString("fr-FR")} – ${new Date(contract.endDate).toLocaleDateString("fr-FR")}`}
								loan={contract.loan}
								status={getContractStatus(contract.endDate)}
							/>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
}


import { For, type JSX, Show } from "solid-js";
import type { BadgeColor } from "../types/styleTypes";
import { Badge } from "./badge";
import Heading from "./heading";
import SearchField from "./searchField";
import Text from "./text";

export interface BoardProps {
	name: string;
	cells: string[];
	columns: string[];
}

export default function Board(props: BoardProps) {
	return (
		<div class="flex flex-col w-3xl bg-background-surface border border-background-border rounded-xl">
			<div
				id="header"
				class="flex justify-between border-b border-background-border p-2"
			>
				<Heading components="h3" size="medium">
					{props.name}
				</Heading>
				<SearchField name="Recherche" />
			</div>
			<div id="body" class="p-2">
				<table class="w-full">
					<thead>
						<tr class="border-b border-background-border w-full">
							<For each={props.columns}>
								{(column) => (
									<th class="text-left p-4">
										<Text components="p">{column}</Text>
									</th>
								)}
							</For>
						</tr>
					</thead>
					<tbody>
						<Show
							when={props.columns.length > 0}
							fallback={
								<tr>
									<td colspan={99999} class="p-4 text-center">
										<Text components="p">Aucune donnée</Text>
									</td>
								</tr>
							}
						>
							<tr>
								<For each={props.cells}>{(cell) => <td>{cell}</td>}</For>
							</tr>
						</Show>
					</tbody>
				</table>
			</div>
		</div>
	);
}

interface ContractBoardLineProps {
	cells: string[];
	status: { label: string; color: BadgeColor };
	onEdit?: () => void;
	onDelete?: () => void;
}

export function ContractBoardLine(props: ContractBoardLineProps) {
	return (
		<tr class="border-b border-backgroiund-border last:border-0">
			<For each={props.cells}>
				{(cell) => (
					<td class="p-4">
						<Text components="p">{cell}</Text>
					</td>
				)}
			</For>
			<td class="p-4">
				<Badge color={props.status.color}>{props.status.label}</Badge>
			</td>
		</tr>
	);
}

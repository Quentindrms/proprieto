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

export interface FluxBoardItem {
	id: string;
	name: string;
	category: string;
	issueDate: string;
	amount: number;
	type: "outcome" | "income";
}

interface FluxBoardProps {
	flux: FluxBoardItem[];
	onClick: (item: FluxBoardItem) => void;
}

export function FluxBoard(props: FluxBoardProps) {
	const [displayOutcomes, setDisplayOutcome] = createSignal<boolean>(false);

	function sortFlux(flux: FluxBoardItem[]) {
		const outcome = flux.filter((outcome) => outcome.type === "outcome");
		const income = flux.filter((income) => income.type === "income");
		return { income, outcome };
	}

	const flux = sortFlux(props.flux);
	flux.income.forEach((income) => {
		income;
	});
	flux.outcome.forEach((outcome) => {
		outcome;
	});

	return (
		<div>
			<ButtonGroup
				options={[
					{
						label: "Revenus",
						value: "income",
						onClick: () => setDisplayOutcome(false),
					},
					{
						label: "Dépenses",
						value: "outcome",
						onClick: () => setDisplayOutcome(true),
					},
				]}
			/>
			<div class="w-xs md:w-xl lg:w-7xl overflow-x-auto rounded-xl shadow-md bg-background-muted/10 border border-background-muted/50 shadow-muted-text">
				<table class="w-full border-collapse">
					<thead class=" shadow-muted-text border-b-2 border-background-muted/50">
						<tr>
							<th class="px-4 py-3 text-left">
								<Heading components="h4" size="large">
									Nom
								</Heading>
							</th>
							<th class="px-4 py-3 text-left">
								<Heading components="h4" size="large">
									Catégorie
								</Heading>
							</th>
							<th class="px-4 py-3 text-left">
								<Heading components="h4" size="large">
									Date d'échéance
								</Heading>
							</th>
							<th class="px-4 py-3 text-left">
								<Heading components="h4" size="large">
									Montant
								</Heading>
							</th>
						</tr>
					</thead>
					<tbody class="bg-background-base">
						<Show when={!displayOutcomes()}>
							<For each={flux.income}>
								{(income) => (
									<FluxRow
										id={income.id}
										amount={income.amount}
										category={income.category}
										issueDate={income.issueDate}
										name={income.name}
										type={income.type}
										onClick={(item) => props.onClick(item)}
									/>
								)}
							</For>
						</Show>
						<Show when={displayOutcomes()}>
							<For each={flux.outcome}>
								{(outcome) => (
									<FluxRow
										id={outcome.id}
										amount={outcome.amount}
										category={outcome.category}
										issueDate={outcome.issueDate}
										name={outcome.name}
										type={outcome.type}
										onClick={(item) => props.onClick(item)}
									/>
								)}
							</For>
						</Show>
					</tbody>
				</table>
			</div>
		</div>
	);
}

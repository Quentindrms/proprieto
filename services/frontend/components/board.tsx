import { For } from "solid-js";
import Heading from "./heading";
import TransactionRow, { ContractRow, type ContractRowData, type TransactionRowData } from "./rows";

interface BoardProps {
	transactions: TransactionRowData[];
}

interface ContractBoardProps {
	contracts: ContractRowData[];
}

export function ContractBoard(props: ContractBoardProps) {
	return (
		<div class="w-full overflow-x-auto rounded-xl shadow-md bg-background-base shadow-muted-text">
			<table class="w-full border-collapse">
				<thead class="bg-background-secondary">
					<tr>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Client</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Propriété</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Période</Heading>
						</th>
						<th class="px-4 py-3 text-right">
							<Heading components="h4" size="large">Loyer</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Statut</Heading>
						</th>
					</tr>
				</thead>
				<tbody class="bg-background-base">
					<For each={props.contracts}>
						{(contract) => <ContractRow {...contract} />}
					</For>
				</tbody>
			</table>
		</div>
	);
}

export default function Board(props: BoardProps) {
	return (
		<div class="w-full overflow-x-auto rounded-xl shadow-md bg-background-base shadow-muted-text">
			<table class="w-full border-collapse">
				<thead class="bg-background-secondary">
					<tr>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Nom</Heading>
						</th>
						<th class="px-4 py-3 text-right">
							<Heading components="h4" size="large">Montant</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Type</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Statut</Heading>
						</th>
					</tr>
				</thead>
				<tbody class="bg-background-base">
					<For each={props.transactions}>
						{(transaction) => <TransactionRow {...transaction} />}
					</For>
				</tbody>
			</table>
		</div>
	);
}

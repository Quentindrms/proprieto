import { For } from "solid-js";
import Heading from "./heading";
import TransactionRow, { type TransactionRowData } from "./rows";

interface BoardProps {
	transactions: TransactionRowData[];
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

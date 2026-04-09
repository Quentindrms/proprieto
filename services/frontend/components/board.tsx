import { For } from "solid-js";
import Heading from "./heading";
import TransactionRow, { ContractorRow, ContractRow, type ContractStatus, type TransactionRowData } from "./rows";

interface BoardProps {
	transactions: TransactionRowData[];
}

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

function getContractStatus(endDate: Date | string): ContractStatus {
	const now = new Date();
	const end = new Date(endDate);
	const daysUntilExpiry = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
	if (end < now) return "expired";
	if (daysUntilExpiry <= 30) return "expiring";
	return "active";
}

export function ContractBoard(props: ContractBoardProps) {
	return (
		<div class="w-7xl overflow-x-auto rounded-xl shadow-md bg-background-base shadow-muted-text">
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

interface ContractorsBoardItem {
	name: string;
	speciality: string,
	phone: string,
	mail: string,
}

interface ContractorsBoardProps {
	contractors: ContractorsBoardItem[]
}

export function ContractorsBoard(props: ContractorsBoardProps) {

	return (
		<div class="w-7xl overflow-x-auto rounded-xl shadow-md bg-background-base shadow-muted-text">
			<table class="w-full border-collapse">
				<thead class="bg-background-base shadow-muted-text">
					<tr>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Prestataire</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Spécialité</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Contact</Heading>
						</th>
						<th class="px-4 py-3 text-left">
							<Heading components="h4" size="large">Actions</Heading>
						</th>
					</tr>
				</thead>
				<tbody class="bg-background-base">
					<For each={props.contractors}>
						{(contractor) => (
							<ContractorRow
								mail={contractor.mail}
								name={contractor.name}
								phone={contractor.phone}
								speciality={contractor.speciality}
							/>
						)}
					</For>
				</tbody>
			</table>
		</div>
	)

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

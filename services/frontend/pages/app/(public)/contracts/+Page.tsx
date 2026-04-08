import { Badge } from "@components/badge";
import Board from "@components/board";
import { ActionButton, ButtonGroup } from "@components/button";
import ContractExpireSoon from "@components/contract";
import Heading from "@components/heading";
import PageNamer from "@components/pageNamer";
import SearchField from "@components/searchField";
import Text from "@components/text";
import { useContract } from "@hooks/useContract";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/create";

export default function Page() {
	const data = useData<Data>();

	const createModal = useModal(350);
	const contract = useContract();
	const stats = contract.getStats(data.contracts);

	const contractsList = data.contracts.map((contract) => [
		new Date(contract.startDate).toLocaleDateString("fr-FR"),
		new Date(contract.endDate).toLocaleDateString("fr-FR"),
		`${contract.lease} euros`,
		contract.property.name,
	]);

	const columns = ["Date de début", "Date de fin", "Loyer", "Propriété"];

	return (
		<div class="w-full flex flex-col">
			<div class="flex items-center justify-between p-2">
				<div class="flex flex-col">
					<Heading components="h1" size="extra-large" fontClasses="bold">
						Gestion des baux
					</Heading>
					<Text class="text-muted-text font-base-regular">
						Supervisez l'ensemble de vos engagements locatifs
					</Text>
				</div>
				<ActionButton>Ajouter un nouveau bail</ActionButton>
			</div>

			<div>
				<ButtonGroup
					options={[
						{ label: "Tous les baux", value: "all", onClick: () => { } },
						{ label: "Actifs", value: "active", onClick: () => { } },
						{ label: "Archivés", value: "archived", onClick: () => { } },
					]}
				/>
			</div>

			<div class="flex flex-col w-2xl p-4">
				<div class="flex justify-between items-center bg-background-base rounded-md">
					<Heading components="h3" size="medium" fontClasses="bold">
						Baux arrivant à terme (nombre)
					</Heading>
					<div>
						<Badge color="warning">Action requise</Badge>
					</div>
				</div>
				<div>
					<ContractExpireSoon
						clientName="Estelle Haubois"
						contractName="Appartement Paris"
						expireDate={new Date()}
					/>
				</div>
			</div>
		</div>
	);
}

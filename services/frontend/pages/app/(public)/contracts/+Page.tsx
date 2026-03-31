import Board from "@components/board";
import { StatCard, StatCardWrapper } from "@components/cards";
import PageNamer from "@components/pageNamer";
import SearchField from "@components/searchField";
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
		<div class="w-dvw h-dvh">
			<PageNamer
				pageName="Mes contrats"
				buttonText="Ajouter un contrat"
				onClick={createModal.open}
			/>

			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<StatCardWrapper>
				<StatCard
					legend="Contrats actifs"
					value={String(data.properties.length)}
					title="Titre"
					accentColor="blue"
				/>
				<StatCard
					legend={""}
					value={String(stats.monthlyLease)}
					title="Titre"
					accentColor="blue"
				/>
				<StatCard
					legend="Expirent dans 6 mois ou moins"
					value={String(stats.endSoon)}
					title="Titre"
					accentColor="blue"
				/>
				<StatCard
					legend="Archivés"
					value="0"
					title="Titre"
					accentColor="blue"
				/>
			</StatCardWrapper>
			<div class="p-2">
				<SearchField name="searchbar" placeholder="Effectuer une recherche" />
			</div>
			<Board columns={columns} cells={contractsList} name="Contrats"></Board>
		</div>
	);
}

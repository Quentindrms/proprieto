import Board from "@components/board";
import { StatCard, StatCardWrapper } from "@components/cards";
import PageNamer from "@components/pageNamer";
import SearchField from "@components/searchField";
import Text from "@components/text";
import { useModal } from "@hooks/useModal";
import CreateModal from "./modal/createModal";

export default function Page() {

	const createModal = useModal(350);

	return (
		<div class="flex flex-col w-dvw h-dvh">
			<PageNamer
				pageName="Mes revenus"
				buttonText="Ajouter un revenu"
				onClick={createModal.open}
			/>

			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<StatCardWrapper>
				<StatCard legend="" value="0" accentColor="blue" title="Ce mois" />
				<StatCard legend="" value="0" accentColor="blue" title="Cette année" />
				<StatCard legend="" value="0" accentColor="blue" title="Récurrents" />
				<StatCard legend="" value="0" accentColor="blue" title="En attente" />
			</StatCardWrapper>
			<div class="p-2">
				<SearchField name="searchbar" placeholder="Effectuer une recherche" />
			</div>
			<div class="p-5">
				<Board columns={[]} cells={[]} name="Contrats">
				</Board>
			</div>
		</div>
	);
}

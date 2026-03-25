import Board from "@components/board";
import { BasicCard, StatCard, StatCardWrapper } from "@components/cards";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import PageNamer from "@components/pageNamer";
import SearchField from "@components/searchField";
import Text from "@components/text";
import { useModal } from "@hooks/useModal";
import CreateOutcomeForm from "./createForm";

export default function Page() {
	const createOutcomeModal = useModal(350);

	return (
		<div class="h-dvh w-dvw flex flex-col">
			<Modal
				close={createOutcomeModal.close}
				isClosing={createOutcomeModal.isClosing}
				isOpened={createOutcomeModal.isOpened}
			>
				<ModalHeader>
					<Heading components="h1" size="medium">
						Ajouter un revenu
					</Heading>
				</ModalHeader>
				<ModalBody>
					<CreateOutcomeForm />
				</ModalBody>
			</Modal>

			<PageNamer
				pageName="Mes dépenses"
				buttonText="Ajouter une dépense"
				onClick={createOutcomeModal.open}
			/>
			<StatCardWrapper>
				<StatCard legend="" value="0" accentColor="blue" title="Ce mois" />
				<StatCard legend="" value="0" accentColor="blue" title="Cette année" />
				<StatCard legend="" value="0" accentColor="blue" title="Récurrentes" />
				<StatCard legend="" value="0" accentColor="blue" title="Non payées" />
			</StatCardWrapper>
			<div class="p-2">
				<SearchField name="searchbar" placeholder="Effectuer une recherche" />
			</div>
			<div class="p-5 flex justify-around">
				<Board cells={[]} columns={[]} name="Contrats"></Board>
				<BasicCard title="Dépenses par catégorie" />
			</div>
		</div>
	);
}

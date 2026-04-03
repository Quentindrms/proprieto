import Board from "@components/board";
import { BasicCard, StatCard, StatCardWrapper } from "@components/cards";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import PageNamer from "@components/pageNamer";
import SearchField from "@components/searchField";
import { useModal } from "@hooks/useModal";
import { useOutcome } from "@hooks/useOutcome";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateOutcomeForm from "./createForm";

export default function Page() {
	const data = useData<Data>();
	const createOutcomeModal = useModal(350);
	const outcome = useOutcome();

	const outcomeCounter = outcome.outcomeCounter(data.outcomes);

	const outcomesList = data.outcomes.map((outcome) => [
		outcome.name,
		String(outcome.amount),
		new Date(outcome.issueDate).toLocaleDateString("fr-FR"),
		outcome.isRecurring ? "Oui" : "Non",
		outcome.isPaid ? "Oui" : "Non",
		outcome.paidOn
			? new Date(outcome.paidOn).toLocaleDateString("fr-FR")
			: "En attente de paiement",
		outcome.frequency,
		`${outcome.provider.directories.name} ${outcome.provider.directories.firstName}`,
		outcome.property.name,
	]);

	const outcomesColls = [
		"Nom",
		"Montant",
		"Date d'émission",
		"Réccurent",
		"Réglé",
		"Date de paiement",
		"Fréquence",
		"Prestataires",
		"Propriété",
	];

	return (
		<div class="h-full w-full flex flex-col">
			<Modal
				close={createOutcomeModal.close}
				isClosing={createOutcomeModal.isClosing}
				isOpened={createOutcomeModal.isOpened}
			>
				<ModalHeader>
					<Heading components="h1" size="medium">
						Ajouter une dépense
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
				<StatCard
					legend=""
					value={`${outcomeCounter.currentMonth} euros`}
					accentColor="blue"
					title="Ce mois"
				/>
				<StatCard
					legend=""
					value={`${outcomeCounter.currentYear} euros`}
					accentColor="blue"
					title="Cette année"
				/>
				<StatCard
					legend=""
					value={outcomeCounter.reccuring}
					accentColor="blue"
					title="Récurrentes"
				/>
				<StatCard
					legend=""
					value={outcomeCounter.unPaid}
					accentColor="blue"
					title="Non payées"
				/>
			</StatCardWrapper>
			<div class="p-2">
				<SearchField name="searchbar" placeholder="Effectuer une recherche" />
			</div>
			<div class="p-5 flex justify-around">
				<Board
					cells={outcomesList}
					columns={outcomesColls}
					name="Contrats"
				></Board>
				<BasicCard title="Dépenses par catégorie" />
			</div>
		</div>
	);
}

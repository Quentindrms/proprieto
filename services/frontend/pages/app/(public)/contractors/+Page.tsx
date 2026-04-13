import { ContractorsBoard } from "@components/board";
import { ButtonGroup } from "@components/button";
import PageNamer from "@components/pageNamer";
import type { ContractorRowData } from "@components/rows";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./createModal";

export default function Page() {
	const createModal = useModal(350);
	const data = useData<Data>();

	const contractor: ContractorRowData[] = data.providers.map((provider) => ({
		name: `${provider.directories.firstName} ${provider.directories.name}`,
		speciality: "spécialité",
		phone: provider.directories.phone,
		mail: provider.directories.email,
	}));

	console.log(contractor);

	return (
		<div class="w-full flex flex-col gap-5">
			<PageNamer
				pageName="Mes prestataires"
				buttonText="Ajouter un prestataire"
				onClick={() => createModal.open()}
				subText="Gérez votre réseau de partenaires pour les interventions techniques"
			/>

			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<ButtonGroup
				options={[
					{ label: "Tous", value: "all" },
					{ label: "Plomberie", value: "plumber" },
					{ label: "Chauffage", value: "chauffage" },
					{ label: "Électricité", value: "electricity" },
				]}
			/>

			<ContractorsBoard contractors={contractor} />
		</div>
	);
}

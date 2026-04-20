import type { ProviderType } from "@app/types/provider";
import { ContractorsBoard } from "@components/board";
import { ButtonGroup } from "@components/button";
import PageNamer from "@components/pageNamer";
import type { ContractorRowData } from "@components/rows";
import { useModal } from "@hooks/useModal";
import {
	ProviderContext,
	useProvider,
} from "@hooks/useProvider";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modal/create";
import DetailsModal from "./modal/details";
import EditModal from "./modal/edit";

export default function Page() {
	const createModal = useModal(350);
	const editModal = useModal(350);
	const detailsModal = useModal(350);

	const data = useData<Data>();

	const provider = useProvider();

	const contractor: ContractorRowData[] = data.providers.map((contractor) => ({
		name: `${contractor.directories.firstName} ${contractor.directories.name}`,
		speciality: "spécialité",
		phone: contractor.directories.phone,
		mail: contractor.directories.email,
		onClick: () => handleClick(contractor),
	}));

	function handleClick(contractor: ProviderType) {
		console.log("Click");
		provider.setDetails(contractor);
		detailsModal.open();
	}

	return (
		<ProviderContext.Provider value={provider}>
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

				<DetailsModal
					close={detailsModal.close}
					isClosing={detailsModal.isClosing}
					isOpened={detailsModal.isOpened}
					onEdit={editModal.open}
					onDelete={provider.remove}
				/>

				<EditModal
					close={editModal.close}
					isOpened={editModal.isOpened}
					isClosing={editModal.isClosing}
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
		</ProviderContext.Provider>
	);
}

import { ButtonGroup } from "@components/button";
import PageNamer from "@components/pageNamer";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./createModal";

export default function Page() {
	const createModal = useModal(350);
	const data = useData<Data>();

	const cells = data.providers.map((provider) => [
		provider.directories.name,
		provider.directories.firstName,
		provider.directories.email,
		provider.directories.address,
		provider.directories.phone,
	]);

	return (
		<div class="w-full">
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

			<ButtonGroup options={[
				{ label: "Tous", value: "all" },
				{ label: "Plomberie", value: "plumber", },
				{ label: "Chauffage", value: "chauffage" },
				{ label: "Électricité", value: "electricity" }
			]} />
		</div>
	);
}

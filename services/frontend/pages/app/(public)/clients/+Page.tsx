import PageNamer from "@components/pageNamer";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/create";

export default function Page() {
	const data = useData<Data>();

	const createModal = useModal(350);

	return (
		<div class="w-full">
			<PageNamer
				pageName="Mes clients test"
				subText="Gestion et suivie des résidents du parc immobilier"
				buttonText="Ajouter un client"
				onClick={createModal.open}
			/>

			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<div class="grid grid-cols-3 gap-2">

			</div>
		</div>
	);
}

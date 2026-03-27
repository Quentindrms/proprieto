import { StatCard, StatCardWrapper } from "@components/cards";
import PageNamer from "@components/pageNamer";
import { useModal } from "@hooks/useModal";
import CreateModal from "./modals/create";

export default function Page() {
	const createModal = useModal(350);

	return (
		<div class="w-dvw">
			<PageNamer
				pageName="Mes clients"
				buttonText="Ajouter un client"
				onClick={createModal.open}
			/>

			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<StatCardWrapper>
				<StatCard legend="Clients totaux" value="0" title="" />

				<StatCard legend="Avec contrat actif" value="0" title="" />

				<StatCard legend="Sans contrat" value="0" title="" />
			</StatCardWrapper>

			<div class="grid grid-cols-3 gap-2"></div>
		</div>
	);
}

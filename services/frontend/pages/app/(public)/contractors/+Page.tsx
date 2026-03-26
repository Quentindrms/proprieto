import Board from "@components/board";
import { StatCard, StatCardWrapper } from "@components/cards";
import PageNamer from "@components/pageNamer";
import Text from "@components/text";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./createModal";

export default function Page() {
	const createModal = useModal(350);
	const data = useData<Data>();

	const cells = data.providers.map((provider) => [
		provider.name,
		provider.firstName,
		provider.email,
		provider.address,
		provider.phone,
	]);

	return (
		<div class="w-dvw h-dvh">
			<PageNamer
				pageName="Mes prestataires"
				buttonText="Ajouter un prestataire"
				onClick={() => createModal.open()}
			/>

			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<StatCardWrapper>
				<StatCard
					legend="Clients totaux"
					value={String(data.providers.length)}
					title=""
				/>

				<StatCard legend="Avec contrat actif" value="0" title="" />

				<StatCard legend="Sans contrat" value="0" title="" />
			</StatCardWrapper>

			<div class="p-5 grid grid-cols-[max-content_max-content_max-content] gap-x-5 gap-y-5">
				<Board
					name="Pestataires"
					columns={["Nom", "Prénom", "Email", "Adresse", "Téléphone"]}
					cells={cells}
				></Board>
			</div>
		</div>
	);
}

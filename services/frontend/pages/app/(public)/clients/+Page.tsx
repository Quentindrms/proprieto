import { StatCard, StatCardWrapper } from "@components/cards";
import ClientCard from "@components/clientCard";
import PageNamer from "@components/pageNamer";
import { useModal } from "@hooks/useModal";
import { For } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/create";

export default function Page() {
	const data = useData<Data>();

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
				<StatCard
					legend="Clients totaux"
					value={String(data.client.length)}
					title=""
				/>

				<StatCard legend="Avec contrat actif" value="0" title="" />

				<StatCard legend="Sans contrat" value="0" title="" />
			</StatCardWrapper>

			<div class="grid grid-cols-3 gap-2">
				<For each={data.client}>
					{(client) => (
						<ClientCard client={client} onDelete={() => {}} onEdit={() => {}} />
					)}
				</For>
			</div>
		</div>
	);
}

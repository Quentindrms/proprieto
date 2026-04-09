import { ClientCard } from "@components/clientCard";
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
		<div class="w-full flex flex-col gap-5">
			<PageNamer
				pageName="Mes clients"
				subText="Gestion et suivie des résidents du parc immobilier"
				buttonText="Ajouter un client"
				onClick={createModal.open}
			/>

			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>
			<div class="flex justify-center">
				<div class="grid grid-cols-[repeat(3,320px)] gap-4">
					<For each={data.client}>
						{(client) => <ClientCard client={client} />}
					</For>
				</div>
			</div>
		</div>
	);
}

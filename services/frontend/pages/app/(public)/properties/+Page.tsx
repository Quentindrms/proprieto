import type { Property } from "@app/types/property";
import { Button } from "@components/button";
import { StatCard, StatCardWrapper } from "@components/cards";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import PropertyCard from "@components/propertyCard";
import SearchField from "@components/searchField";
import { useModal } from "@hooks/useModal";
import { useProperty } from "@hooks/useProperty";
import type { PropertyCreationType } from "@schemas/property";
import { createSignal, For } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreatePropertyForm from "./form";
import UpdatePropertyForm from "./updateForm";

export default function Page() {
	const data = useData<Data>();

	const [propertyToEdit, setPropertyToEdit] =
		createSignal<PropertyCreationType | null>(null);

	const createModal = useModal(350);
	const updateModal = useModal(350);
	const property = useProperty();

	return (
		<div class="w-dvw">
			<div class="flex justify-between p-2">
				<Modal
					close={createModal.close}
					isClosing={createModal.isClosing}
					isOpened={createModal.isOpened}
				>
					<ModalHeader>
						<Heading components="h1" size="medium">
							Ajouter une propriété
						</Heading>
					</ModalHeader>
					<ModalBody>
						<CreatePropertyForm />
					</ModalBody>
				</Modal>

				<Modal
					close={updateModal.close}
					isClosing={updateModal.isClosing}
					isOpened={updateModal.isOpened}
				>
					<ModalHeader>
						<Heading components="h1" size="medium">
							Ajouter une propriété
						</Heading>
					</ModalHeader>
					<ModalBody>
						<UpdatePropertyForm property={propertyToEdit()} />
					</ModalBody>
				</Modal>

				<Heading components="h1" size="large" color="white">
					Mes propriétés
				</Heading>
				<Button type="button" icons="add" onClick={updateModal.open}>
					Créer une nouvelle propriété
				</Button>
			</div>

			<StatCardWrapper>
				<StatCard
					title=""
					value={String(data.properties.length)}
					legend="Propriétés au total"
				/>
				<StatCard title="" value="0" legend="Actives" />
				<StatCard title="" value="0" legend="En location" />
				<StatCard title="" value="0" legend="Vendues" />
			</StatCardWrapper>

			<div class="p-4">
				<SearchField name="searchfield" placeholder="Recherchez..." />
			</div>

			<div class="p-4 grid grid-cols-3 gap-4">
				<For each={data.properties}>
					{(property) => (
						<PropertyCard
							property={property}
							onEdit={(p) => {
								setPropertyToEdit({
									name: p.name,
									purchasePrice: p.purchasePrice ? Number(p.purchasePrice) : 0,
									purchaseDate: p.purchaseDate
										? new Date(p.purchaseDate)
										: new Date(),
									sellPrice: p.sellPrice ? Number(p.sellPrice) : undefined,
									sellDate: p.sellDate ? new Date(p.sellDate) : undefined,
								});
								updateModal.open();
							}}
						/>
					)}
				</For>
			</div>
		</div>
	);
}

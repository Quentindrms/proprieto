import type { Property } from "@app/types/property";
import { Button } from "@components/button";
import { StatCard, StatCardWrapper } from "@components/cards";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import PropertyCard from "@components/propertyCard";
import SearchField from "@components/searchField";
import Text from "@components/text";
import { useModal } from "@hooks/useModal";
import CreatePropertyForm from "./form";

export default function Page() {
	const modal = useModal(1500);

	const property: Property = {
		name: "Ma propriété",
		purshacePrice: "100 000",
		purshaceDate: new Date(),
		sellPrice: "0",
		sellDate: new Date(),
		isDeleted: false,
		isActive: true,
		type: "Appartement",
	};

	return (
		<div class="w-dvw">
			<div class="flex justify-between p-2">
				<Modal
					close={modal.close}
					isClosing={modal.isClosing}
					isOpened={modal.isOpened}
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
				<Heading components="h1" size="large" color="white">
					Mes propriétés
				</Heading>
				<Button type="button" icons="add" onClick={modal.open}>
					Créer une nouvelle propriété
				</Button>
			</div>
			<StatCardWrapper>
				<StatCard title="" value="0" legend="Propriétés au total" />
				<StatCard title="" value="0" legend="Actives" />
				<StatCard title="" value="0" legend="En location" />
				<StatCard title="" value="0" legend="Vendues" />
			</StatCardWrapper>
			<div class="p-4">
				<SearchField name="searchfield" placeholder="Recherchez..." />
			</div>

			<div class="p-4 grid grid-cols-3 gap-4">
				<PropertyCard property={property} />
				<PropertyCard property={property} />
				<PropertyCard property={property} />
				<PropertyCard property={property} />
				<PropertyCard property={property} />
			</div>
		</div>
	);
}

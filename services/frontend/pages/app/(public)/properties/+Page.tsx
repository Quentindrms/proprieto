import type { Property } from "@app/types/property";
import { ButtonBadge } from "@components/badge";
import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import PropertyCard from "@components/propertyCard";
import Text from "@components/text";
import { useModal } from "@hooks/useModal";
import { useProperty } from "@hooks/useProperty";
import type { PropertyUpdateType } from "@schemas/property";
import { createSignal, For } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modal/createModal";

const fakeProperty: Property = {
	id: "",
	isActive: true,
	isDeleted: false,
	name: "Ma belle maison",
	propertyType: {
		id: "",
		name: "",
		slug: "",
	},
	userId: "",
	purchaseDate: new Date(),
	purchasePrice: "100000",
	sellDate: undefined,
	sellPrice: undefined,
};

const fakeData = ["", "", "", "", "", "", "", ""]

export default function Page() {
	const data = useData<Data>();

	const [propertyToEdit, setPropertyToEdit] =
		createSignal<PropertyUpdateType | null>(null);
	const [propertyToDelete, setPropertyToDelete] = createSignal<string>("");

	const createModal = useModal(350);
	const updateModal = useModal(350);

	const removeProperty = useProperty().remove;

	return (
		<div class="w-full h-full flex-col">
			<CreateModal close={createModal.close} isClosing={createModal.isClosing} isOpened={createModal.isOpened} />
			<div class="flex justify-between p-3">
				<div class="flex flex-col">
					<Heading components="h1" size="extra-large" fontClasses="bold">
						Portefeuille immobilier
					</Heading>
					<Text size="extra-small" class="font-base-regular">
						Gérer et suivez l'ensemble de votre portefeuille
					</Text>
				</div>
				<ActionButton color="black" onClick={createModal.open}>Ajouter un bien</ActionButton>
			</div>
			<div class="flex flex-row gap-4 p-4">
				<ButtonBadge color="primary" onClick={() => { }}>Tous les biens (25)</ButtonBadge>
				<ButtonBadge color="primary" onClick={() => { }}>Appartements</ButtonBadge>
				<ButtonBadge color="primary" onClick={() => { }}>Maisons</ButtonBadge>
				<ButtonBadge color="primary" onClick={() => { }}>Bureaux</ButtonBadge>
			</div>

			<div class="flex flex-wrap gap-x-4 gap-y-8">
				<For each={fakeData.slice(0, 6)}>
					{(property) => (
						<PropertyCard property={fakeProperty} />
					)}
				</For>
			</div>
		</div>
	);
}

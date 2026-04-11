import type { Property } from "@app/types/property";
import { ButtonBadge } from "@components/badge";
import PageNamer from "@components/pageNamer";
import PropertyCard from "@components/propertyCard";
import { useModal } from "@hooks/useModal";
import { useProperty } from "@hooks/useProperty";
import type { PropertyUpdateType } from "@schemas/property";
import { createSignal, For } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modal/createModal";

const fakeData = ["", "", "", "", "", "", "", ""];

export default function Page() {
	const data = useData<Data>();

	const [propertyToEdit, setPropertyToEdit] =
		createSignal<PropertyUpdateType | null>(null);
	const [propertyToDelete, setPropertyToDelete] = createSignal<string>("");

	const createModal = useModal(350);
	const updateModal = useModal(350);

	const removeProperty = useProperty().remove;

	const [filter, setFilter] = createSignal<"office" | "house" | "apartment" | "all">("all");

	const properties = () => {
		if (filter() === "all") return data.properties;
		return data.properties.filter((p) => p.propertyType.slug === filter());
	};

	function sortProperties(type: "office" | "house" | "apartment" | "all") {
		setFilter(type);
	}

	return (
		<div class="w-full h-full flex-col">
			<CreateModal close={createModal.close} isClosing={createModal.isClosing} isOpened={createModal.isOpened} />
			<PageNamer buttonText="Ajouter un bien" onClick={createModal.open} pageName="Portfolio immobilier" subText="Gérez et suivez l'ensemble de votre parc immobilier" />

			<div class="flex flex-row gap-4 p-4">
				<ButtonBadge color="primary" onClick={() => sortProperties("all")}>Tous les biens ({properties().length})</ButtonBadge>
				<ButtonBadge color="primary" onClick={() => sortProperties("apartment")}>Appartements</ButtonBadge>
				<ButtonBadge color="primary" onClick={() => sortProperties("house")}>Maisons</ButtonBadge>
				<ButtonBadge color="primary" onClick={() => sortProperties("office")}>Bureaux</ButtonBadge>
			</div>

			<div class="flex flex-wrap gap-x-4 gap-y-8">
				<For each={properties().slice(0, 6)}>
					{(property) => (
						<PropertyCard property={property} />
					)}
				</For>
			</div>
		</div>
	);
}

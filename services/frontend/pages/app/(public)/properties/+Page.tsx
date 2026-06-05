import { ButtonBadge } from "@components/badge";
import PageNamer from "@components/pageNamer";
import PropertyCard from "@components/propertyCard";
import { useModal } from "@hooks/useModal";
import { createSignal, For } from "solid-js";
import { navigate } from "vike/client/router";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modal/createModal";

export default function Page() {
	const data = useData<Data>();

	const createModal = useModal(350);

	const [filter, setFilter] = createSignal<
		"office" | "house" | "apartment" | "all"
	>("all");

	const properties = () => {
		if (filter() === "all") return data.properties;
		return data.properties.filter((p) => p.propertyType.slug === filter());
	};

	function sortProperties(type: "office" | "house" | "apartment" | "all") {
		setFilter(type);
	}

	return (
		<div class="w-full h-full flex-col">
			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<PageNamer
				buttonText="Ajouter un bien"
				onClick={createModal.open}
				pageName="Portfolio immobilier"
				subText="Gérez et suivez l'ensemble de votre parc immobilier"
			/>

			<div class="flex flex-col gap-2 items-center md:flex-col lg:flex-row p-2">
				<ButtonBadge
					color="primary"
					onClick={() => sortProperties("all")}
					effect
				>
					Tous les biens ({data.properties.length})
				</ButtonBadge>
				<ButtonBadge
					color="primary"
					onClick={() => sortProperties("apartment")}
					effect
				>
					Appartements
				</ButtonBadge>
				<ButtonBadge
					color="primary"
					onClick={() => sortProperties("house")}
					effect
				>
					Maisons
				</ButtonBadge>
				<ButtonBadge
					color="primary"
					onClick={() => sortProperties("office")}
					effect
				>
					Bureaux
				</ButtonBadge>
			</div>

			<div class="p-2 flex flex-wrap gap-x-8 gap-y-4 justify-center items-center">
				<For each={properties().slice(0, 6)}>
					{(property) => (
						<PropertyCard
							property={property}
							onClick={() => {
								navigate(`/app/properties/${property.slug}`);
							}}
						/>
					)}
				</For>
			</div>
		</div>
	);
}

import { BiSolidCarGarage } from "solid-icons/bi";
import { FaSolidBuilding, FaSolidHouse } from "solid-icons/fa";
import { ImOffice } from "solid-icons/im";
import { Show } from "solid-js";
import type { Property } from "../types/property";

import Heading from "./heading";
import Text from "./text";

interface PropertyCardProps {
	property: Property;
	onDelete?: (propertyId: string) => void;
	onEdit?: (property: Property) => void;
	onClick: () => void;
}

export default function PropertyCard(props: PropertyCardProps) {
	return (
		<button
			type="button"
			onClick={props.onClick}
			class="h-80 w-xs md:w-sm md:h-70 flex flex-col md:flex-wrap bg-background-base rounded-xl shadow-lg inset-shadow-sm text-left cursor-pointer p-2 hover:-translate-y-1 transition-transform"
		>
			<div
				class="w-full flex items-center justify-center p-4"
				id="headerImage"
			>
				<Show when={props.property.propertyType.slug === "house"}>
					<FaSolidHouse size={75} />
				</Show>
				<Show when={props.property.propertyType.slug === "office"}>
					<ImOffice size={75} />
				</Show>
				<Show when={props.property.propertyType.slug === "apartment"}>
					<FaSolidBuilding size={75} />
				</Show>
				<Show when={props.property.propertyType.slug === "garage"}>
					<BiSolidCarGarage size={75} />
				</Show>
			</div>
			<div id="headerCard" class="flex justify-between items-center p-2 gap-2 w-full">
				<Heading components="h3" size="large" fontClasses="medium" class="truncate min-w-0">
					{props.property.name}
				</Heading>
			</div>
			<div
				id="bodyCard"
				class="w-full md:w-full flex justify-between items-center"
			>
				<div class="flex flex-col">
					<Text size="medium">Date d'acquisition</Text>
					<Text size="base" bold>
						{props.property.purchaseDate
							? new Date(props.property.purchaseDate).toLocaleDateString(
								"fr-FR",
							)
							: "-"}
					</Text>
					<Text size="base" bold>{props.property.purchasePrice ? (Intl.NumberFormat("fr-FR").format(props.property.purchasePrice)) : "-"} €</Text>
				</div>
				<div class="flex flex-col">
					<Text size="medium">Plus value</Text>
					<Text size="large">-</Text>
				</div>
			</div>
		</button>
	);
}

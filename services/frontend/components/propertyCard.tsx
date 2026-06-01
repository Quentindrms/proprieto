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
			class="w-xs md:w-md lg:w-lg flex flex-col bg-background-base rounded-md shadow-lg inset-shadow-sm shadow-slate-900/80 text-left cursor-pointer p-2 hover:-translate-y-1 transition-transform"
		>
			<div
				class="flex items-center justify-center p-4 md:w-md lg:w-lg"
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
			<div id="headerCard" class="flex justify-between items-center p-2">
				<Heading components="h3" size="large" fontClasses="medium">
					{props.property.name}
				</Heading>
				<Text size="base">{props.property.purchasePrice ? (Intl.NumberFormat("fr-FR").format(props.property.purchasePrice)) : "-"} €</Text>
			</div>
			<div
				id="bodyCard"
				class="w-3xs md:w-md flex justify-between items-center"
			>
				<div class="flex flex-col">
					<Text size="medium">Date d'acquisition</Text>
					<Text size="large">
						{props.property.purchaseDate
							? new Date(props.property.purchaseDate).toLocaleDateString(
								"fr-FR",
							)
							: "-"}
					</Text>
				</div>
				<div class="flex flex-col">
					<Text size="medium">Plus value</Text>
					<Text size="large">-</Text>
				</div>
			</div>
		</button>
	);
}

import type { Property } from "../types/property";
import { Badge } from "./badge";
import { Button } from "./button";
import Heading from "./heading";
import Text from "./text";

interface PropertyCardProps {
	property: Property;
	onDelete?: (propertyId: string) => void;
	onEdit?: (property: Property) => void;
	onClick: () => void,
}

export default function PropertyCard(props: PropertyCardProps) {
	return (
		<button
			type="button"
			onClick={props.onClick}
			class="w-xs flex flex-col bg-background-base rounded-md shadow-md shadow-background-muted text-left cursor-pointer">
			<div class="" id="headerImage">

			</div>
			<div id="headerCard" class="flex justify-between p-2">
				<Heading components="h3" size="large" fontClasses="medium">{props.property.name}</Heading>
				<Text size="base">{props.property.purchasePrice}€</Text>
			</div>
			<div id="bodyCard" class="flex justify-between">
				<div class="flex flex-col">
					<Text size="medium">Date d'acquisition</Text>
					<Text size="large">{props.property.purchaseDate ? new Date(props.property.purchaseDate).toLocaleDateString("fr-FR") : "-"}</Text>
				</div>
				<div class="flex flex-col">
					<Text size="medium">Plus value</Text>
					<Text size="large">-</Text>
				</div>
			</div>
		</button>
	);
}

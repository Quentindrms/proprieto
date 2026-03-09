import type { Property } from "../types/property";
import { Badge } from "./badge";
import { Button } from "./button";
import Text from "./text";

interface PropertyCardProps {
    property: Property;
    onDelete?: () => void;
    onEdit?: () => void;
}

export default function PropertyCard(props: PropertyCardProps) {
    return (
        <div class="bg-background-surface m-w-xs m-w-md rounded-xl">
            <div id="header" class="border border-background-border flex justify-between items-center p-2 rounded-xl" >
                <div class="flex flex-col gap-1 border-b border-background-border">
                    <Text components="p">{props.property.name}</Text>
                    <Badge color="blue">{props.property.type}</Badge>
                </div>
                <Badge color={props.property.isActive ? "green" : "red"}>{props.property.isActive ? "Actif" : "Inactif"}</Badge>
            </div >
            <div id="body" class="flex flex-col gap-2 p-2 border-b border-background-border">
                <div class="flex justify-between">
                    <Text components="p">Prix d'achat</Text>
                    <Text components="p">{props.property.purshacePrice}</Text>
                </div>
                <div class="flex justify-between">
                    <Text components="p">Date d'achat</Text>
                    <Text components="p">{props.property.purshaceDate.toLocaleDateString()}</Text>
                </div>
                <div class="flex justify-between">
                    <Text components="p">Prix de vente</Text>
                    <Text components="p">{props.property.sellPrice}</Text>
                </div>
                <div class="flex justify-between">
                    <Text components="p">Date de vente</Text>
                    <Text components="p">{props.property.sellDate.toLocaleDateString()}</Text>
                </div>
            </div>
            <div id="footer" class="flex justify-between p-2">
                <Button type="button" color="blue" onClick={props.onEdit}>Modifier</Button>
                <Button type="button" color="red" onClick={props.onDelete}>Supprimer</Button>
            </div>
        </div >
    );
}

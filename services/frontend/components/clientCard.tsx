import type { Client } from "../types/client";
import { Badge } from "./badge";
import Text from "./text";

interface ClientCardProps {
    client: Client;
}

export default function ClientCard(props: ClientCardProps) {

    return (
        <div class="w-md bg-background-surface rounded-xl border border-background-border">
            <div id="header" class="flex justify-between p-2 items-center border-b border-background-border">
                <div class="flex gap-2">
                    <Text
                        components="p"
                    >
                        {props.client.name}
                    </Text>
                    <Text
                        components="p"
                    >
                        {props.client.surname}
                    </Text>
                </div>
                <Badge color="green">Locataire</Badge>
            </div>
            <div
                id="body"
                class="flex flex-col gap-2 border-b border-background-border"
            >
                <Text components="p">{props.client.email}</Text>
                <Text components="p">{props.client.phone}</Text>
                <Text components="p">{props.client.adress}</Text>


            </div>
            <div id="footer" class="flex justify-between p-2">
                <Text components="p"> 0 contrat</Text>
                <div class="flex gap-2">
                    <Text components="p">Éditer</Text>
                    <Text components="p">Supprimer</Text>
                </div>
            </div>
        </div>
    )
}

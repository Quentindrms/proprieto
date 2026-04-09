import { FiMail, FiPhone, FiUser } from "solid-icons/fi";
import type { Client } from "../types/client";
import { Badge } from "./badge";
import { ActionButton } from "./button";
import Heading from "./heading";
import Text from "./text";

interface ClientCardProps {
	client: Client;
	onDelete?: () => void;
	onEdit?: () => void;
}

export function ClientCard(props: ClientCardProps) {
	return (
		<div class="w-xs flex flex-col p-4 bg-background-base rounded-xl gap-4 shadow-xs shadow-background-muted">
			<div class="flex flex-col justify-center items-center gap-2">
				<FiUser size={90} />
				<Heading
					components="h3"
					size="large"
					fontClasses="bold"
				>{`${props.client.firstName} ${props.client.name}`}</Heading>
			</div>
			<span class="h-1 w-full bg-background-muted/10 rounded-full"></span>

			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-3">
					<FiMail size={18} class="shrink-0 text-text-muted" />
					<Text class="">{props.client.email}</Text>
				</div>
				<div class="flex items-center gap-3">
					<FiPhone size={18} class="shrink-0 text-text-muted" />
					<Text class="">{props.client.phone}</Text>
				</div>
			</div>
			<div class="flex justify-center">
				<ActionButton color="black">Consulter le profil</ActionButton>
			</div>
		</div>
	);
}

interface ClientListProps {
	client: Client;
	onDelete?: () => void;
	onEdit?: () => void;
}
export function ClientList(props: ClientListProps) {
	return (
		<div class="flex gap-2 items-center w-md bg-background-base p-2">
			<FiUser size={45} />
			<div class="flex flex-col p-2">
				<Heading
					components="h3"
					size="large"
					fontClasses="medium"
				>{`${props.client.firstName} ${props.client.name}`}</Heading>
				<Text class="font-base-regular">{props.client.email}</Text>
			</div>
			<div class="flex gap-4 p-2">
				<FiMail size={25} />
				<FiPhone size={25} />
			</div>
		</div>
	);
}

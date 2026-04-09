import { createSignal, onMount } from "solid-js";
import type { ButtonIcons } from "../types/styleTypes";
import { ActionButton, Button } from "./button";
import Heading from "./heading";
import Text from "./text";

interface PageNamerProps {
	pageName: string;
	subText: string,
	buttonText: string;
	onClick: () => void;
	buttonIcons?: ButtonIcons;
}

export default function PageNamer(props: PageNamerProps) {
	return (
		<div class="flex justify-between p-2">
			<div class="flex flex-col">
				<Heading components="h1" size="extra-large" fontClasses="bold">
					{props.pageName}
				</Heading>
				<Text size="extra-small" class="font-base-regular text-muted-text">{props.subText}</Text>
			</div>
			<ActionButton type="button" onClick={props.onClick}>
				{props.buttonText}
			</ActionButton>
		</div>
	);
}

interface PageNamerDaterProps {
	buttonText: string;
	username: string;
	onClick: () => void;
	buttonIcons?: ButtonIcons;
}

export function PageNamerDater(props: PageNamerDaterProps) {
	const [date, setDate] = createSignal<string>();

	onMount(() => {
		setDate(
			new Date().toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "long",
				year: "numeric",
				hour: "numeric",
				hourCycle: "h24",
			}),
		);
	});

	return (
		<div class="flex justify-between p-4 items-center">
			<div class="flex flex-col gap-2">
				<Heading components="h1" size="large">
					Bonjour, {props.username}
				</Heading>
				<Text>{date()}</Text> - Vue d'ensemble
			</div>
			<Button type="button" onClick={props.onClick} icons={props.buttonIcons}>
				{props.buttonText}
			</Button>
		</div>
	);
}

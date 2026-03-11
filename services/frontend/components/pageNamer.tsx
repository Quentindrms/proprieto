import type { ButtonIcons } from "../types/styleTypes";
import { Button } from "./button";
import Heading from "./heading";
import Text from "./text";

interface PageNamerProps {
	pageName: string;
	buttonText: string;
	onClick: () => void;
	buttonIcons?: ButtonIcons;
}

export default function PageNamer(props: PageNamerProps) {
	return (
		<div class="flex justify-between p-4 items-center">
			<Heading components="h1" size="large">
				{props.pageName}
			</Heading>
			<Button type="button" onClick={props.onClick} icons={props.buttonIcons}>
				{props.buttonText}
			</Button>
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
	const date = new Date().toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "numeric",
		hourCycle: "h24",
	});

	return (
		<div class="flex justify-between p-4 items-center">
			<div class="flex flex-col gap-2">
				<Heading components="h1" size="large">
					Bonjour, {props.username}
				</Heading>
				<Text>{date}</Text> - Vue d'ensemble
			</div>
			<Button type="button" onClick={props.onClick} icons={props.buttonIcons}>
				{props.buttonText}
			</Button>
		</div>
	);
}

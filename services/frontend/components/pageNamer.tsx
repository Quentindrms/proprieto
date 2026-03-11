import type { ButtonIcons } from "../types/styleTypes";
import { Button } from "./button";
import Heading from "./heading";

interface PageNamerProps {
	pageName: string;
	buttonText: string;
	onClick: () => void;
	buttonIcons?: ButtonIcons;
}

export default function PageNamer(props: PageNamerProps) {
	return (
		<div class="flex justify-between p-4">
			<Heading components="h1" size="large">
				{props.pageName}
			</Heading>
			<Button type="button" onClick={props.onClick} icons={props.buttonIcons}>
				{props.buttonText}
			</Button>
		</div>
	);
}

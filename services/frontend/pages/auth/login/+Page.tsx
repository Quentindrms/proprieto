import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import LoginForm from "./form";

export default function Page() {
	return (
		<div class="flex flex-col min-h-dvh w-dvw">
			<div class="p-4">
				<a href="/">
					<ActionButton color="outline">Accueil</ActionButton>
				</a>
			</div>
			<div class="flex flex-1 flex-col gap-4 justify-center items-center p-4 pb-8">
				<Heading components="h1" size="extra-large" color="black" fontClasses="bold">
					Connexion
				</Heading>
				<LoginForm />
			</div>
		</div>
	);
}

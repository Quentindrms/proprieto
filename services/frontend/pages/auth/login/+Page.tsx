import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import LoginForm from "./form";

export default function Page() {
	return (
		<div class="relative flex flex-col gap-4 justify-center items-center w-dvw h-dvh">
			<div class="absolute top-6 left-6">
				<a href="/">
					<ActionButton color="outline">← Accueil</ActionButton>
				</a>
			</div>
			<Heading components="h1" size="extra-large" color="black" fontClasses="bold">
				Connexion
			</Heading>
			<LoginForm />
		</div>
	);
}

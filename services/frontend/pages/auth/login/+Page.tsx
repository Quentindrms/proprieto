import Heading from "@components/heading";
import LoginForm from "./form";

export default function Page() {
	return (
		<div class="flex flex-col gap-4 justify-center items-center w-dvw">
			<Heading components="h1" size="extra-large" color="black" fontClasses="bold">
				Connexion
			</Heading>
			<LoginForm />
		</div>
	);
}

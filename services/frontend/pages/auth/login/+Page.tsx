import Heading from "@components/heading";
import LoginForm from "./form";

export default function Page() {
	return (
		<div class="flex flex-col justify-center items-center w-dvw">
			<Heading components="h1" size="big" color="white">
				Connexion
			</Heading>
			<LoginForm />
		</div>
	);
}

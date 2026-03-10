import { StatCard } from "../../../../components/cards";
import Heading from "../../../../components/heading";
import PageNamer from "../../../../components/pageNamer";

export default function Page() {
	return (
		<div class="w-dvw h-dvh">
			<PageNamer
				pageName="Mes contrats"
				buttonText="Ajouter un contrat"
				onClick={() => {}}
			/>
			<div id="top-wrapper" class="flex w-full gap-5">
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
			</div>
			<div></div>
		</div>
	);
}

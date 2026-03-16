import Board from "@components/board";
import { StatCard, StatCardWrapper } from "@components/cards";
import Heading from "@components/heading";
import PageNamer from "@components/pageNamer";
import SearchField from "@components/searchField";
import Text from "@components/text";

export default function Page() {
	return (
		<div class="w-dvw h-dvh">
			<PageNamer
				pageName="Mes contrats"
				buttonText="Ajouter un contrat"
				onClick={() => {}}
			/>
			<StatCardWrapper>
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
				<StatCard legend="Légend" value="0" title="Titre" accentColor="blue" />
			</StatCardWrapper>
			<div class="p-2">
				<SearchField name="searchbar" placeholder="Effectuer une recherche" />
			</div>
			<Board columns={[]} name="Contrats">
				<Text components="p">Test</Text>
			</Board>
		</div>
	);
}

import Board from "../../../../components/board";
import {
	BasicCard,
	StatCard,
	StatCardWrapper,
} from "../../../../components/cards";
import PageNamer from "../../../../components/pageNamer";
import SearchField from "../../../../components/searchField";
import Text from "../../../../components/text";

export default function Page() {
	return (
		<div class="h-dvh w-dvw flex flex-col">
			<PageNamer
				pageName="Mes dépenses"
				buttonText="Ajouter une dépense"
				onClick={() => {}}
			/>
			<StatCardWrapper>
				<StatCard legend="" value="0" accentColor="blue" title="Ce mois" />
				<StatCard legend="" value="0" accentColor="blue" title="Cette année" />
				<StatCard legend="" value="0" accentColor="blue" title="Récurrentes" />
				<StatCard legend="" value="0" accentColor="blue" title="Non payées" />
			</StatCardWrapper>
			<div class="p-2">
				<SearchField name="searchbar" placeholder="Effectuer une recherche" />
			</div>
			<div class="p-5 flex justify-around">
				<Board columns={[]} name="Contrats">
					<Text components="p">Test</Text>
				</Board>
				<BasicCard title="Dépenses par catégorie" />
			</div>
		</div>
	);
}

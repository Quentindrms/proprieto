import Board from "../../../../components/board";
import { StatCard, StatCardWrapper } from "../../../../components/cards";
import PageNamer from "../../../../components/pageNamer";
import SearchField from "../../../../components/searchField";
import Text from "../../../../components/text";

export default function Page() {
	return (
		<div class="flex flex-col w-dvw h-dvh">
			<PageNamer
				pageName="Mes revenus"
				buttonText="Ajouter un revenu"
				onClick={() => {}}
			/>
			<StatCardWrapper>
				<StatCard legend="" value="0" accentColor="blue" title="Ce mois" />
				<StatCard legend="" value="0" accentColor="blue" title="Cette année" />
				<StatCard legend="" value="0" accentColor="blue" title="Récurrents" />
				<StatCard legend="" value="0" accentColor="blue" title="En attente" />
			</StatCardWrapper>
			<div class="p-2">
				<SearchField name="searchbar" placeholder="Effectuer une recherche" />
			</div>
			<div class="p-5">
				<Board columns={[]} name="Contrats">
					<Text components="p">Prout le monde</Text>
				</Board>
			</div>
		</div>
	);
}

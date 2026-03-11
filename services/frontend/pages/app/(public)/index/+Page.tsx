import Board from "../../../../components/board";
import { Button } from "../../../../components/button";
import {
	BasicCard,
	StatCard,
	StatCardWrapper,
} from "../../../../components/cards";
import Heading from "../../../../components/heading";
import SearchField from "../../../../components/searchField";
import Text from "../../../../components/text";

export default function Page() {
	const date = new Date().toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "numeric",
		hourCycle: "h24",
	});

	return (
		<div class="min-h-dvh w-dvw flex flex-col gap-5">
			<div class="flex justify-between items-center p-2">
				<div>
					<Heading components="h1" size="big" color="white">
						Bonjour, username
					</Heading>
					<Text components="p" size="base">
						{date} - Vue d'ensemble
					</Text>
				</div>
				<Button type="button" icons="add">
					Ajouter une propriété
				</Button>
			</div>
			<div>
				<div class="p-2">
					<SearchField name="searchField" />
				</div>
			</div>

			<StatCardWrapper>
				<StatCard
					legend="Deuis hier"
					value="0"
					accentColor="blue"
					title="Titre"
				/>

				<StatCard
					legend="Deuis hier"
					value="0"
					accentColor="blue"
					title="Titre"
				/>

				<StatCard
					legend="Deuis hier"
					value="0"
					accentColor="blue"
					title="Titre"
				/>

				<StatCard
					legend="Deuis hier"
					value="0"
					accentColor="blue"
					title="Titre"
				/>
			</StatCardWrapper>

			<div class="flex flex-col gap-5">
				<div id="wrapper-board" class="flex gap-5 justify-center">
					<Board name="board" columns={["1", "2", "3", "4", "5"]}>
						Zizicopter
					</Board>
					<BasicCard title="Répartition" />
				</div>
				<div class="flex gap-5 justify-around">
					<BasicCard title="card"></BasicCard>
					<BasicCard title="card"></BasicCard>
					<BasicCard title="card"></BasicCard>
				</div>
			</div>
		</div>
	);
}

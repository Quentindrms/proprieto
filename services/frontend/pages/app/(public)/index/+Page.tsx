import Board from "../../../../components/board";
import { Button } from "../../../../components/button";
import { BasicCard, StatCard } from "../../../../components/cards";
import Heading from "../../../../components/heading";
import SearchField from "../../../../components/searchField";
import Text from "../../../../components/text";

export default function Page() {
	const date = new Date();

	return (
		<div class="min-h-dvh flex flex-col gap-5">
			<div class="flex justify-between items-center p-2">
				<div>
					<Heading components="h1" size="big" color="white">
						Bonjour, username
					</Heading>
					<Text components="p" size="base">
						{date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()} -
						Vue d'ensemble
					</Text>
				</div>
				<Button type="button">Ajouter une propriété</Button>
			</div>
			<div>
				<div class="p-2">
					<SearchField name="searchField" />
				</div>
			</div>
			<div id="top-wrapper" class="flex justify-center items-center gap-5 p-2">
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
			</div>
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

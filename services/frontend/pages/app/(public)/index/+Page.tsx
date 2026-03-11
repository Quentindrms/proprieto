import Board from "../../../../components/board";
import { Button } from "../../../../components/button";
import {
	BasicCard,
	StatCard,
	StatCardWrapper,
} from "../../../../components/cards";
import Heading from "../../../../components/heading";
import { PageNamerDater } from "../../../../components/pageNamer";
import SearchField from "../../../../components/searchField";
import Text from "../../../../components/text";

export default function Page() {
	return (
		<div class="min-h-dvh w-dvw flex flex-col gap-5">
			<PageNamerDater
				buttonText="Ajouter une propriété"
				onClick={() => {}}
				username="username"
				buttonIcons="add"
			/>
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

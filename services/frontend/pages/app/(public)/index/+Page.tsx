import Board from "@components/board";
import { ActionButton } from "@components/button";
import { CardProgressionBar, CardRevenue } from "@components/dataCard";
import Heading from "@components/heading";
import Text from "@components/text";

export default function Page() {
	return (
		<div class="h-full w-full flex flex-col gap-5">
			<div class="flex justify-around items-center justify-between p-2">

				<div class="flex flex-col">
					<Heading components="h1" size="extra-large" fontClasses="bold" class="">Portfolio</Heading>
					<Text class="text-muted-text font-base-regular" size="extra-small">Aperçu de vos !!!!NOMBRE PROPRIETÉ!!!! et de leurs performances</Text>
				</div>
				<ActionButton color="black">Ajouter une propriété</ActionButton>
			</div>

			<div class="flex gap-5 justify-center">
				<CardRevenue title="Revenu total" stat={1300} comment="10% de plus que le mois dernier" />
				<CardRevenue title="Dépense totale" stat={1300} comment="10% de plus que le mois dernier" />
				<CardProgressionBar title="Taux d'occupation" value={30} min={0} max={100} style="light" size="large" />
			</div>


			<div class="flex gap-2">
				<Board transactions={[
					{ name: "Loyer - Appartement Lyon", amount: 850, type: "income", isPaid: true },
					{ name: "Loyer - Studio Bordeaux", amount: 620, type: "income", isPaid: false },
					{ name: "Charges copropriété", amount: 180, type: "outcome", isPaid: true },
					{ name: "Réparation plomberie", amount: 320, type: "outcome", isPaid: true },
					{ name: "Loyer - Maison Nantes", amount: 1100, type: "income", isPaid: true },
					{ name: "Assurance habitation", amount: 95, type: "outcome", isPaid: false },
					{ name: "Taxe foncière", amount: 740, type: "outcome", isPaid: false },
					{ name: "Loyer - T2 Paris", amount: 1450, type: "income", isPaid: true },
				]} />
				<div class="w-2xl">
					<p>Prout le monde !</p>
				</div>
			</div>

		</div>
	);
}

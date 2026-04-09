import type { Property } from "@app/types/property";
import Board from "@components/board";
import { ActionButton } from "@components/button";
import { CardProgressionBar, CardRevenue } from "@components/dataCard";
import Heading from "@components/heading";
import PageNamer from "@components/pageNamer";
import PropertyCard from "@components/propertyCard";
import Text from "@components/text";

export default function Page() {
	const property: Property = {
		id: "",
		isActive: true,
		isDeleted: false,
		name: "Ma belle maison",
		propertyType: {
			id: "",
			name: "",
			slug: "",
		},
		userId: "",
		purchaseDate: new Date(),
		purchasePrice: "100000",
		sellDate: undefined,
		sellPrice: undefined,
	};

	return (
		<div class="h-full w-full flex flex-col gap-5">
			<PageNamer onClick={() => { }} pageName="Portfolio" subText="Aperçu de vos <nombre propriété> et de leurs performances" buttonText="Ajouter une propriété" />

			<div class="flex gap-5 justify-center">
				<CardRevenue
					title="Revenu total"
					stat={1300}
					comment="10% de plus que le mois dernier"
				/>
				<CardRevenue
					title="Dépense totale"
					stat={1300}
					comment="10% de plus que le mois dernier"
				/>
				<CardProgressionBar
					title="Taux d'occupation"
					value={30}
					min={0}
					max={100}
					style="light"
					size="large"
				/>
			</div>

			<div class="flex gap-2">
				<Board
					transactions={[
						{
							name: "Loyer - Appartement Lyon",
							amount: 850,
							type: "income",
							isPaid: true,
						},
						{
							name: "Loyer - Studio Bordeaux",
							amount: 620,
							type: "income",
							isPaid: false,
						},
						{
							name: "Charges copropriété",
							amount: 180,
							type: "outcome",
							isPaid: true,
						},
						{
							name: "Réparation plomberie",
							amount: 320,
							type: "outcome",
							isPaid: true,
						},
						{
							name: "Loyer - Maison Nantes",
							amount: 1100,
							type: "income",
							isPaid: true,
						},
						{
							name: "Assurance habitation",
							amount: 95,
							type: "outcome",
							isPaid: false,
						},
						{
							name: "Taxe foncière",
							amount: 740,
							type: "outcome",
							isPaid: false,
						},
						{
							name: "Loyer - T2 Paris",
							amount: 1450,
							type: "income",
							isPaid: true,
						},
					]}
				/>
				<div class="flex flex-col gap-2 p-2">
					<CardRevenue title="Profit du portefeuille" stat={15360} />
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<Heading size="extra-large" components="h2">
					Propriétés les plus perfomantes
				</Heading>
				<div class="flex flex-row">
					<PropertyCard property={property} />
				</div>
			</div>
		</div>
	);
}

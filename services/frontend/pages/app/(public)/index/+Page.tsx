import type { Property } from "@app/types/property";
import Board from "@components/board";
import { CardProgressionBar, CardRevenue } from "@components/dataCard";
import Heading from "@components/heading";
import PageNamer from "@components/pageNamer";
import PropertyCard from "@components/propertyCard";
import type { TransactionRowData } from "@components/rows";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";

export default function Page() {
	const data = useData<Data>();

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

	const currentMonthProfit = data.monthlyIncome.sum - data.monthlyOutcome.sum;

	const incomesRow: TransactionRowData[] = data.monthlyIncome.incomes.map(
		(income) => ({
			id: income.id,
			name: income.name,
			amount: income.amount,
			type: "income",
			isPaid: income.isPaid,
			issueDate: new Date(income.issueDate)
		}),
	);
	const outcomesRow: TransactionRowData[] = data.monthlyOutcome.outcomes.map(
		(outcome) => ({
			id: outcome.id,
			name: outcome.name,
			amount: outcome.amount,
			type: "outcome",
			isPaid: outcome.isPaid,
			issueDate: new Date(outcome.issueDate)
		}),
	);

	const transactionRow: TransactionRowData[] = [...incomesRow, ...outcomesRow];
	const sortedTransactionRow = transactionRow.sort((a, b) => {
		const dateA = new Date(a.issueDate).getTime();
		const dateB = new Date(b.issueDate).getTime();
		return (dateB - dateA);
	})

	return (
		<div class="h-full w-full flex flex-col gap-5">
			<PageNamer
				onClick={() => { }}
				pageName="Portfolio"
				subText={`Aperçu de vos ${data.propertyCount} propriétés et de leurs performances`}
				buttonText="Ajouter une propriété"
			/>

			<div class="flex gap-5 justify-center">
				<CardRevenue
					title="Dépense totale"
					stat={data.monthlyOutcome.sum}
					comment={
						data.monthlyOutcome.growth > 0
							? `${data.monthlyOutcome.growth}% par rapport au mois précédent`
							: `${data.monthlyOutcome.growth}% par rapport au mois précédent`
					}
					dynamic
				/>
				<CardRevenue
					title="Revenu total"
					stat={data.monthlyIncome.sum}
					comment={
						data.monthlyIncome.growth > 0
							? `+${data.monthlyIncome.growth}% par rapport au mois précédent`
							: `${data.monthlyOutcome.growth}% par rapport au mois précédent`
					}
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
				<Board transactions={sortedTransactionRow} />
				<div class="flex flex-col gap-2 p-2">
					<CardRevenue
						title="Profit du portefeuille"
						stat={currentMonthProfit}
					/>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<Heading size="extra-large" components="h2">
					Propriétés les plus perfomantes
				</Heading>
				<div class="flex flex-row">
					<PropertyCard property={property} onClick={() => { }} />
				</div>
			</div>
		</div>
	);
}

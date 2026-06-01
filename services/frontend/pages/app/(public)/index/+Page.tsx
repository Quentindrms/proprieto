import Board from "@components/board";
import { CardInfo, CardRevenue } from "@components/dataCard";
import Heading from "@components/heading";
import PageNamer from "@components/pageNamer";
import type { TransactionRowData } from "@components/rows";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";

export default function Page() {
	const data = useData<Data>();

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

			<div class="flex flex-col md:flex-row gap-5 justify-center items-stretch">
				<CardRevenue
					title="Dépense totale"
					stat={data.monthlyOutcome.sum}
					comment={
						data.monthlyOutcome.growth > 0
							? `${data.monthlyOutcome.growth}% par rapport au mois précédent`
							: `${data.monthlyOutcome.growth}% par rapport au mois précédent`
					}
					dynamic={true}
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

				<CardInfo
					title="Revenu en attente de paiement"
					stat={0}
				/>

				<CardInfo
					title="Dépense en attente de paiement"
					stat={0}
				/>

			</div>

			<div class="flex flex-col-reverse items-center md:flex-row gap-2">
				<Board transactions={sortedTransactionRow} />
			</div>

			<div class="flex flex-col gap-2">
				<Heading size="extra-large" components="h2">
					Propriétés les plus perfomantes
				</Heading>
				<div class="flex flex-row">
				</div>
			</div>
		</div>
	);
}

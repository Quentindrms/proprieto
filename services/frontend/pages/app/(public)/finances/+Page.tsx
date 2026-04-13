import { FluxBoard, type FluxBoardItem } from "@components/board";
import { CardRevenue } from "@components/dataCard";
import PageNamer from "@components/pageNamer";
import { useModal } from "@hooks/useModal";
import { createSignal } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/createModal";
import DetailsModal from "./modals/details";

export default function Page() {
    const [finances, setFinances] = createSignal<FluxBoardItem>({
        amount: "0",
        category: "",
        issueDate: "",
        name: "",
        type: "outcome",
    });

    const createModal = useModal(350);
    const detailsModal = useModal(350);
    const data = useData<Data>();

    const incomes: FluxBoardItem[] = data.incomeList.map((income) => ({
        name: income.name,
        category: income.incomeCategoryId,
        issueDate: new Date(income.issueDate).toLocaleDateString("fr-FR"),
        amount: String(income.amount),
        type: "income",
    }));

    const outcomes: FluxBoardItem[] = data.outcomeList.map((outcome) => ({
        name: outcome.name,
        category: "",
        issueDate: new Date(outcome.issueDate).toLocaleDateString("fr-FR"),
        amount: String(outcome.amount),
        type: "outcome",
    }));

    const now = new Date();
    const isCurrentMonth = (date: Date | string) => {
        const d = new Date(date);
        return (
            d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        );
    };

    const totalMonthIncomes = data.incomeList
        .filter((i) => isCurrentMonth(i.issueDate))
        .reduce((sum, i) => sum + i.amount, 0);

    const totalMonthOutcomes = data.outcomeList
        .filter((o) => isCurrentMonth(o.issueDate))
        .reduce((sum, o) => sum + o.amount, 0);

    const flux = outcomes.concat(incomes);

    return (
        <div class="w-full flex flex-col gap-5">
            <CreateModal
                close={createModal.close}
                isClosing={createModal.isClosing}
                isOpened={createModal.isOpened}
            />

            <DetailsModal
                close={detailsModal.close}
                isClosing={detailsModal.isClosing}
                finances={finances()}
                isOpened={detailsModal.isOpened}
            />

            <PageNamer
                onClick={() => createModal.open()}
                pageName="Flux financiers"
                subText="Gestion des revenus et des dépenses mensuels"
                buttonText="Ajouter une transaction"
            />

            <div class="flex gap-4">
                <CardRevenue
                    stat={totalMonthIncomes}
                    title="Revenu du mois"
                    comment=""
                    dynamic
                />
                <CardRevenue
                    stat={totalMonthOutcomes}
                    title="Dépense du mois"
                    comment=""
                    dynamic
                />
            </div>

            <FluxBoard flux={flux} onClick={(item) => { setFinances(item); detailsModal.open(); }} />
        </div>
    );
}

import type { IncomeDetail } from "@app/types/income";
import type { OutcomeDetail } from "@app/types/outcome";
import { FluxBoard, type FluxBoardItem } from "@components/board";
import { CardRevenue } from "@components/dataCard";
import PageNamer from "@components/pageNamer";
import { FinanceContext, useFinance } from "@hooks/useFinance";
import { onGetFluxDetails } from "@hooks/useFinance.telefunc";
import { useModal } from "@hooks/useModal";
import type { IncomeUpdateType } from "@schemas/income";
import type { OutcomeUpdateType } from "@schemas/outcome";
import { createSignal } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/createModal";
import DetailsModal from "./modals/details";
import EditModal from "./modals/edit";

export default function Page() {
    const [selected, setSelected] = createSignal<{
        id: string;
        type: "income" | "outcome";
    }>({ id: "", type: "income" });
    const [detail, setDetail] = createSignal<IncomeDetail | OutcomeDetail | null>(
        null,
    );
    const [editType, setEditType] = createSignal<"income" | "outcome">("income")

    const createModal = useModal(350);
    const detailsModal = useModal(350);
    const editModal = useModal(350)

    const data = useData<Data>();
    const finances = useFinance();

    async function handleRowClick(item: FluxBoardItem) {
        const result = await onGetFluxDetails(item.id, item.type);
        setSelected({ id: item.id, type: item.type });
        if (result) setDetail(result);
        detailsModal.open();
    }

    const incomes: FluxBoardItem[] = data.incomeList.map((income) => ({
        id: income.id,
        name: income.name,
        category: income.incomeCategoryId,
        issueDate: new Date(income.issueDate).toLocaleDateString("fr-FR"),
        amount: String(income.amount),
        type: "income",
    }));

    const outcomes: FluxBoardItem[] = data.outcomeList.map((outcome) => ({
        id: outcome.id,
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

    const monthProfit = totalMonthIncomes - totalMonthOutcomes;

    const flux = outcomes.concat(incomes);

    function handleEdit(
        detail: IncomeDetail | OutcomeDetail,
        type: "income" | "outcome",
    ) {
        setEditType(type)
        if (type === "income") {
            finances.setUpdateIncome({ ...(detail as unknown as IncomeUpdateType) });
            console.log(finances.updateIncome());
            editModal.open();
        } else {
            finances.setUpdateOutcome({
                ...(detail as unknown as OutcomeUpdateType),
            });
            console.log(finances.updateOutcome());
            editModal.open();
        }
    }

    return (
        <FinanceContext.Provider value={finances}>
            <div class="w-full flex flex-col gap-5">
                <CreateModal
                    close={createModal.close}
                    isClosing={createModal.isClosing}
                    isOpened={createModal.isOpened}
                />

                <DetailsModal
                    close={detailsModal.close}
                    isClosing={detailsModal.isClosing}
                    detail={detail()}
                    selected={selected()}
                    isOpened={detailsModal.isOpened}
                    edit={handleEdit}
                />

                <EditModal
                    close={editModal.close}
                    isClosing={editModal.isClosing}
                    isOpened={editModal.isOpened}
                    type={editType()}
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
                    <CardRevenue
                        stat={monthProfit}
                        title="Bénéfice du mois"
                        comment=""
                        dynamic
                    />
                </div>

                <FluxBoard flux={flux} onClick={handleRowClick} />
            </div>
        </FinanceContext.Provider>
    );
}

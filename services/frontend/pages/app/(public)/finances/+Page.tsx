import { FluxBoard } from "@components/board";
import { CardRevenue } from "@components/dataCard";
import PageNamer from "@components/pageNamer";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/createModal";

export default function Page() {
    const createModal = useModal(350);
    const data = useData<Data>();

    return (
        <div class="w-full flex flex-col gap-5">
            <CreateModal
                close={createModal.close}
                isClosing={createModal.isClosing}
                isOpened={createModal.isOpened}
            />

            <PageNamer
                onClick={() => createModal.open()}
                pageName="Flux financiers"
                subText="Gestion des revenus et des dépenses mensuels"
                buttonText="Ajouter une transaction"
            />

            <div class="flex gap-4">
                <CardRevenue stat={4850} title="Revenu du mois" comment="" dynamic />
                <CardRevenue stat={4850} title="Dépense du mois" comment="" dynamic />
            </div>

            <FluxBoard
                flux={[
                    {
                        name: "Test revenu",
                        amount: "100",
                        category: "",
                        issueDate: "01/01/2026",
                        type: "income",
                    },
                    {
                        name: "Test revenu",
                        amount: "100",
                        category: "",
                        issueDate: "01/01/2026",
                        type: "income",
                    },
                    {
                        name: "Test dépense",
                        amount: "100",
                        category: "",
                        issueDate: "01/01/2026",
                        type: "outcome",
                    },
                    {
                        name: "Test dépense",
                        amount: "100",
                        category: "",
                        issueDate: "01/01/2026",
                        type: "outcome",
                    },
                ]}
            />
        </div>
    );
}

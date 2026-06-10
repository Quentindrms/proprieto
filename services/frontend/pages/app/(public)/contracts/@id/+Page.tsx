import ContractResume from "@components/contractResume";
import { CardInfo, CardProgressionBar } from "@components/dataCard";
import PageNamer from "@components/pageNamer";
import { useContract } from "@hooks/useContract";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import DeleteModal from "./modal/delete";

export default function ContractDetails() {
    const data = useData<Data>();
    const contract = useContract();
    const deleteModal = useModal(350);

    return (
        <>
            <DeleteModal
                close={deleteModal.close}
                isClosing={deleteModal.isClosing}
                isOpened={deleteModal.isOpened}
            />

            <div class="w-full h-full">
                <PageNamer
                    pageName={`Détails du contrat avec ${data.contract.client.directory.firstName} ${data.contract.client.directory.name}`}
                    subText="Consulter les informations de vos engagements locatifs"
                    onClick={() => { }}
                />

                <div class="flex flex-wrap gap-2 pb-4">
                    <CardProgressionBar
                        size="normal"
                        style="light"
                        title="Progression du contrat"
                        value={contract.progression(
                            data.contract.startDate,
                            data.contract.endDate,
                        )}
                        max={100}
                        min={0}
                    />

                    <CardInfo
                        stat={contract.estimatedIncome(
                            data.contract.startDate,
                            data.contract.endDate,
                            data.contract.lease,
                        )}
                        title="Gain prévisionnel du contrat"
                    />
                </div>

                <ContractResume
                    name={data.contract.client.directory.name}
                    firstName={data.contract.client.directory.firstName}
                    lease={data.contract.lease}
                    totalLease={contract.totalIncome(data.incomes)}
                    startDate={data.contract.startDate}
                    endDate={data.contract.endDate}
                    onDelete={() => deleteModal.open()}
                    onEdit={() => { }}
                />
            </div>
        </>
    );
}

import { CardProgressionBar, CurrentContractCard } from "@components/dataCard";
import PageNamer from "@components/pageNamer";

export default function ContractDetails() {

    return (
        <div class="w-full h-full">
            <PageNamer
                pageName="Détails du contrat avec <nom du client>"
                subText="Consulter les informations de vos engagements locatifs"
                onClick={() => { }}
            />

            <div class="flex flex-wrap gap-2 pb-4">
                <CurrentContractCard
                    client=""
                    endDate={undefined}
                />

                <CardProgressionBar
                    size="normal"
                    style="light"
                    title="Progression du contrat"
                    value={(Date.now() / new Date("01-01-2026").getTime()) * 100}
                    max={100}
                    min={0}
                />
            </div>
        </div>
    )
}
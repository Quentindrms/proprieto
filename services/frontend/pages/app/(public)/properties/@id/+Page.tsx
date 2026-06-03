import { CurrentContractCard } from "@components/clientCard";
import PageNamer from "@components/pageNamer";

export default function PropertyDetails() {

    return (
        <div class="w-full h-full flex-col">
            <PageNamer
                onClick={() => { }}
                pageName="Détail de <nom de votre propriété>"
                subText="Consulter les détails de votre propriété"
            />

            <div class="flex flex-wrap">
                <CurrentContractCard
                    client="Jean Dupont"
                    endDate={new Date()}
                />
            </div>
        </div>
    )
}
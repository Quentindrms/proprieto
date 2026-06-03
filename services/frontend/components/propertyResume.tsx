import { Button } from "./button";
import Text from "./text";

interface PropertyResumeProps {
    name?: string,
    purchaseDate?: string,
    purchasePrice?: number,
    totalLoans?: number,
    surfaceArea?: number,
}

export default function PropertyResume(props: PropertyResumeProps) {

    return (
        <div class="p-4 h-fit w-sm border-2 border-slate-marked background-base rounded-xl flex flex-col gap-1 shadow-xs shadow-background-muted">

            <Text size="large">Nom : <span class="font-bold">{props.name}</span></Text>
            <Text size="large">Date d'achat : <span class="font-bold">{props.purchaseDate ? new Date(props.purchaseDate).toLocaleDateString("fr-FR") : " - "}</span></Text>
            <Text size="large">Prix d'achat : <span class="font-bold">{props.purchasePrice ? Intl.NumberFormat("fr-FR").format(props.purchasePrice) : " - "} €</span></Text>
            <Text size="large">Superficie : <span class="font-bold">{props.surfaceArea} m2</span></Text>
            <Text size="large">Total des loyers : <span class="font-bold">{props.totalLoans} €</span></Text>

            <div class="flex flex-wrap gap-4 justify-between items-center p-2">
                <Button type="button" color="green">Modifier</Button>
                <Button type="button" color="red">Supprimer</Button>
            </div>
        </div>
    )
}
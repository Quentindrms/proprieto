import { Button } from "./button";
import Text from "./text";

interface PropertyResumeProps {
    name: string,
    purchaseDate: Date,
    purchasePrice: number,
    totalLoans: number,
    surfaceArea: number,
}

export default function PropertyResume(props: PropertyResumeProps) {

    return (
        <div class="p-2 w-xs border-2 border-slate-marked background-base rounded-xl flex flex-col gap-1 shadow-xs shadow-background-muted">

            <Text size="medium">Nom : <span class="font-bold">{props.name}</span></Text>
            <Text size="medium">Date d'achat : <span class="font-bold">{props.purchaseDate.toLocaleDateString("fr-FR")}</span></Text>
            <Text size="medium">Prix d'achat : <span class="font-bold">{props.purchasePrice} €</span></Text>
            <Text size="medium">Superficie : <span class="font-bold">{props.surfaceArea} m2</span></Text>
            <Text size="medium">Total des loyers : <span class="font-bold">{props.totalLoans} €</span></Text>

            <div class="flex justify-between items-center">
                <Button type="button" color="green">Modifier</Button>
                <Button type="button" color="red">Supprimer</Button>
            </div>
        </div>
    )
}
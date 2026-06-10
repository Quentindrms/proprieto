import { differenceInMonths } from "date-fns";
import { Button } from "./button";
import Text from "./text";


interface ContractResumeProps {
    name: string,
    firstName: string,
    startDate: Date,
    endDate: Date,
    lease: number,
    totalLease: number,
    onEdit: () => void,
    onDelete: () => void,
}

export default function ContractResume(props: ContractResumeProps) {

    return (
        <div class="p-4 h-fit w-sm lg:w-2xl border-2 border-slate-marked background-base rounded-xl flex flex-col gap-3 shadow-xs shadow-background-muted">

            <Text size="large">Client : <span class="font-bold">{props.firstName} {props.name}</span></Text>
            <Text size="large">Date de début : <span class="font-bold">{new Date(props.startDate).toLocaleDateString("fr-FR")}</span></Text>
            <Text size="large">Date de fin : <span class="font-bold">{new Date(props.endDate).toLocaleDateString("fr-FR")}</span></Text>
            <Text size="large">Durée du contrat : <span class="font-bold">{differenceInMonths(props.endDate, props.startDate)} mois </span></Text>
            <Text size="large">Loyer mensuel : <span class="font-bold">{props.lease} €</span></Text>
            <Text size="large">Total des loyers perçus : <span class="font-bold">{props.totalLease} €</span></Text>

            <div class="flex flex-wrap gap-4 justify-between items-center p-2">
                <Button type="button" color="green" onClick={props.onEdit}>Modifier</Button>
                <Button type="button" color="red" onClick={props.onDelete}>Supprimer</Button>
            </div>
        </div>
    )
}
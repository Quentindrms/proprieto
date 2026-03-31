import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import { UseIncome } from "@hooks/useIncome";

export default function () {

    const income = UseIncome();

    return (
        <Form callback={income.create}>

            <TextField label="Nom" onInput={income.handleCreateInput("name")} />

            <TextField label="Montant" onInput={income.handleCreateInput("amount")} />

            <CheckBox label="Payé" onInput={income.handleCreateInput("isPaid")} />

            <TextField label="Date d'émission" type="date" onInput={income.handleCreateInput("issueDate")} />

            <TextField label="Date de paiement" type="date" onInput={income.handleCreateInput("isPaid")} />

            <Select label="Réccurence" labelOptions="Sélectionner une réccurence" options={[]} onInput={income.handleCreateInput("isRecurring")} />

            <div class="flex justify-center p-4">
                <Button type="submit">Ajouter une dépense</Button>
            </div>

        </Form>
    )

}
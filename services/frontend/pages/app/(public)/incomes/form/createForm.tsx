import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import { UseIncome } from "@hooks/useIncome";
import { useData } from "vike-solid/useData";
import type { Data } from "../+data";

export default function () {
    const data = useData<Data>();

    const income = UseIncome();
    const incomeCategory = data.income.map(
        (income) => ({ label: income.name, value: income.id, disabled: false }),
    );

    return (
        <Form callback={income.create}>
            <TextField label="Nom" onInput={income.handleCreateInput("name")} />

            <TextField label="Montant" onInput={income.handleCreateInput("amount")} />

            <CheckBox label="Payé" onInput={income.handleCreateInput("isPaid")} />

            <TextField
                label="Date d'émission"
                type="date"
                onInput={income.handleCreateInput("issueDate")}
            />

            <TextField
                label="Date de paiement"
                type="date"
                onInput={income.handleCreateInput("isPaid")}
            />

            <Select
                label="Réccurence"
                labelOptions="Sélectionner une réccurence"
                options={[]}
                onInput={income.handleCreateInput("isRecurring")}
            />

            <Select
                label="Catégorie"
                labelOptions="Sélectionner une catégorie"
                options={incomeCategory}
                onInput={income.handleCreateInput("incomeCategoryId")}
            />

            <div class="flex justify-center p-4">
                <Button type="submit">Ajouter une dépense</Button>
            </div>
        </Form>
    );
}

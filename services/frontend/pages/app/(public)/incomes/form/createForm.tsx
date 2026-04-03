import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import { UseIncome } from "@hooks/useIncome";
import { recurrence } from "@utils/recurrence";
import { useData } from "vike-solid/useData";
import type { Data } from "../+data";

export default function () {
    const data = useData<Data>();

    const income = UseIncome();
    const incomeCategory = data.income.map((income) => ({
        label: income.label,
        value: income.id,
        disabled: false,
    }));
    const propertyList = data.properties.map((property) => ({
        label: property.name,
        value: property.id,
        disabled: false,
    }));

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
                label="Récurrence"
                labelOptions="Sélectionner une récurrence"
                options={recurrence}
                onInput={income.handleCreateInput("isRecurring")}
            />

            <Select
                label="Catégorie"
                labelOptions="Sélectionner une catégorie"
                options={incomeCategory}
                onInput={income.handleCreateInput("incomeCategoryId")}
            />

            <Select
                label="Propriété"
                labelOptions="Sélectionner une propriété"
                options={propertyList}
                onInput={income.handleCreateInput("propertyId")}
            />

            <div class="flex justify-center p-4">
                <Button type="submit">Ajouter une dépense</Button>
            </div>
        </Form>
    );
}

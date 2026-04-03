import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import Text from "@components/text";
import { UseIncome } from "@hooks/useIncome";
import { recurrence } from "@utils/recurrence";
import { createSignal, Show } from "solid-js";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "../+data";

export default function () {
    const data = useData<Data>();

    const income = UseIncome();
    const incomeCategory = data.incomeCategories.map((income) => ({
        label: income.label,
        value: income.id,
        disabled: false,
    }));
    const contractsList = data.contracts.map((contract) => ({
        label: contract.property.name,
        value: contract.id,
        disabled: false,
    }));

    const [isPaid, setIsPaid] = createSignal<boolean>(false);

    return (
        <Form callback={income.create}>
            <TextField label="Nom" onInput={income.handleCreateInput("name")} />

            {income.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.formError()!.error).properties?.name
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField label="Montant" onInput={income.handleCreateInput("amount")} />
            {income.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.formError()!.error).properties?.amount
                            ?.errors[0]
                    }
                </Text>
            )}

            <Select
                label="Contrat associé"
                labelOptions="Sélectionner un contrat"
                options={contractsList}
                onInput={income.handleCreateInput("contractId")}
            />
            {income.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.formError()!.error).properties?.contractId
                            ?.errors[0]
                    }
                </Text>
            )}


            <TextField
                label="Date d'émission"
                type="date"
                onInput={income.handleCreateInput("issueDate")}
            />
            {income.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.formError()!.error).properties?.issueDate
                            ?.errors[0]
                    }
                </Text>
            )}

            <CheckBox
                label="Payé"
                onInput={() => {
                    income.handleCreateInput("isPaid");
                    setIsPaid(!isPaid())
                }}
            />
            {income.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.formError()!.error).properties?.isPaid
                            ?.errors[0]
                    }
                </Text>
            )}

            <Show when={isPaid()}>
                <TextField
                    label="Date de paiement"
                    type="date"
                    onInput={income.handleCreateInput("isPaid")}
                />
                {income.formError() && (
                    <Text class="text-red-500">
                        {
                            z.treeifyError(income.formError()!.error).properties?.paidOn
                                ?.errors[0]
                        }
                    </Text>
                )}
            </Show>

            <Select
                label="Récurrence"
                labelOptions="Sélectionner une récurrence"
                options={recurrence}
                onInput={income.handleCreateInput("frequency")}
            />
            {income.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.formError()!.error).properties?.frequency
                            ?.errors[0]
                    }
                </Text>
            )}

            <Select
                label="Catégorie"
                labelOptions="Sélectionner une catégorie"
                options={incomeCategory}
                onInput={income.handleCreateInput("incomeCategoryId")}
            />
            {income.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.formError()!.error).properties
                            ?.incomeCategoryId?.errors[0]
                    }
                </Text>
            )}
            <div class="flex justify-center p-4">
                <Button type="submit">Ajouter une dépense</Button>
            </div>
        </Form>
    );
}

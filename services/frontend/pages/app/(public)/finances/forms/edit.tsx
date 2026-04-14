import { Button } from "@components/button";
import {
    Form,
    Select,
    TextField,
    ToggleSwitch,
} from "@components/form";
import Text from "@components/text";
import { useFinanceContext } from "@hooks/useFinance";
import { recurrence } from "@utils/recurrence";
import { createSignal, Show } from "solid-js";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "../+data";

export function EditOutcomeForm() {
    const data = useData<Data>();
    const [isRecuring, setIsRecuring] = createSignal<boolean>(false);
    const [isPaid, setIsPaid] = createSignal<boolean>(false);

    const providersList = data.providers.map((provider) => ({
        value: provider.id,
        label: `${provider.directories.firstName} ${provider.directories.name}`,
        disabled: false,
    }));

    const categoryList = data.outcomeCategories.map((category) => ({
        value: category.id,
        label: category.label,
        disabled: false,
    }));

    const propertiesList = data.properties.map((property) => ({
        value: property.id,
        label: property.name,
        disabled: false,
    }));

    const outcome = useFinanceContext();

    return (
        <Form callback={outcome.handleEditOutcome}>
            <TextField
                label="Nom"
                name="name"
                onInput={outcome.handleUpdateOutcome("name")}
                value={outcome.updateOutcome().name}
            />

            {outcome.outcomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(outcome.outcomeErrors()!.error).properties?.name
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField
                label="Montant"
                type="number"
                name="amount"
                onInput={outcome.handleInputOutcome("amount")}
                value={outcome.updateOutcome().amount}
            />

            {outcome.outcomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(outcome.outcomeErrors()!.error).properties?.amount
                            ?.errors[0]
                    }
                </Text>
            )}
            <div class="flex flex-row gap-2">
                <div class="flex flex-col">
                    <Select
                        label="Propriété concernée"
                        labelOptions="Sélectionner une proprieté"
                        options={propertiesList}
                        onInput={outcome.handleInputOutcome("propertyId")}
                        value={outcome.updateOutcome().propertyId}
                    />

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties
                                    ?.propertyId?.errors[0]
                            }
                        </Text>
                    )}
                </div>

                <Select
                    label="Catégorie de dépense"
                    labelOptions="Sélectionner une catégorie"
                    options={categoryList}
                    onInput={outcome.handleInputOutcome("categoryId")}
                    value={outcome.updateOutcome().categoryId}
                />

                {outcome.outcomeErrors() && (
                    <Text class="text-red-500">
                        {
                            z.treeifyError(outcome.outcomeErrors()!.error).properties
                                ?.categoryId?.errors[0]
                        }
                    </Text>
                )}
            </div>

            <Select
                label="Créancier"
                labelOptions="Sélectionner un créancier"
                options={providersList}
                onInput={outcome.handleInputOutcome("providerId")}
                value={outcome.updateOutcome().providerId}
            />

            <TextField
                label="Date d'émission"
                type="date"
                name="issueDate"
                onInput={outcome.handleInputOutcome("issueDate")}
                value={outcome.updateOutcome().issueDate ? new Date(outcome.updateOutcome().issueDate ?? "").toISOString().split("T")[0] : ""}
            />
            <div class="flex gap-5">
                <div class="flex flex-col">
                    <ToggleSwitch
                        label="Réccurent"
                        onInput={(event: InputEvent) => {
                            outcome.handleInputOutcome("isRecurring")(event);
                            setIsRecuring(!isRecuring());
                        }}
                        checked={outcome.updateOutcome().isRecurring}
                    />

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties
                                    ?.isRecurring?.errors[0]
                            }
                        </Text>
                    )}
                </div>
                <Show when={isRecuring()}>
                    <Select
                        label="Fréquence de paiement"
                        labelOptions={"Indiquer une fréquence de paiement"}
                        options={recurrence}
                        onInput={outcome.handleInputOutcome("frequency")}
                    ></Select>

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties
                                    ?.frequency?.errors[0]
                            }
                        </Text>
                    )}
                </Show>
            </div>
            <div class="flex gap-5">
                <div class="flex flex-col">
                    <ToggleSwitch
                        label="Payé"
                        name="isPaid"
                        onInput={(event: InputEvent) => {
                            outcome.handleInputOutcome("isPaid")(event);
                            setIsPaid(!isPaid());
                        }}
                        checked={outcome.updateOutcome().isPaid}

                    />

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties
                                    ?.isPaid?.errors[0]
                            }
                        </Text>
                    )}
                </div>

                <Show when={isPaid()}>
                    <TextField
                        label="Date de paiement"
                        type="date"
                        name="paidOn"
                        onInput={outcome.handleInputOutcome("paidOn")}
                        value={outcome.updateOutcome().paidOn ? new Date(outcome.updateOutcome().paidOn ?? "").toISOString().split("T")[0] : ""}
                    />
                </Show>
            </div>
            {outcome.outcomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(outcome.outcomeErrors()!.error).properties?.issueDate
                            ?.errors[0]
                    }
                </Text>
            )}

            <div class="flex justify-center p-2">
                <Button type="submit">Ajouter une dépense</Button>
            </div>
        </Form>
    );
}




export function EditIncomeForm() {
    const data = useData<Data>();
    const [isPaid, setIsPaid] = createSignal<boolean>(false);
    const [isRecuring, setIsRecuring] = createSignal<boolean>(false);

    const income = useFinanceContext();

    const incomeCategory = data.incomeCategories.map((category) => ({
        label: category.label,
        value: category.id,
        disabled: false,
    }));
    const contractsList = data.contractList.map((contract) => ({
        label: contract.property.name,
        value: contract.id,
        disabled: false,
    }))

    return (
        <Form callback={income.handleEditIncome}>
            <TextField label="Nom" onInput={income.handleUpdateIncome("name")}
                value={income.updateIncome().name} />

            {income.incomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.incomeErrors()!.error).properties?.name
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField label="Montant" onInput={income.handleUpdateIncome("amount")} value={income.updateIncome().amount} />
            {income.incomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.incomeErrors()!.error).properties?.amount
                            ?.errors[0]
                    }
                </Text>
            )}
            <div class="flex gap-2">
                <div>
                    <Select
                        label="Contrat associé"
                        labelOptions="Sélectionner un contrat"
                        options={contractsList}
                        onInput={income.handleUpdateIncome("contractId")}
                        value={income.updateIncome().contractId}
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties
                                    ?.contractId?.errors[0]
                            }
                        </Text>
                    )}
                </div>
                <div class="flex flex-col">
                    <Select
                        label="Catégorie"
                        labelOptions="Sélectionner une catégorie"
                        options={incomeCategory}
                        onInput={income.handleUpdateIncome("incomeCategoryId")}
                        value={income.updateIncome().incomeCategoryId}
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties
                                    ?.incomeCategoryId?.errors[0]
                            }
                        </Text>
                    )}
                </div>
            </div>

            <TextField
                label="Débiteur ????"
                onInput={income.handleUpdateIncome("issueDate")}

                disabled
            />

            <TextField
                label="Date d'émission"
                type="date"
                onInput={income.handleUpdateIncome("issueDate")}
                value={income.updateIncome().issueDate ? new Date(income.updateIncome().issueDate ?? "").toISOString().split("T")[0] : ""}
            />
            {income.incomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.incomeErrors()!.error).properties?.issueDate
                            ?.errors[0]
                    }
                </Text>
            )}

            <div class="flex gap-2">
                <div class="flex flex-col">
                    <ToggleSwitch
                        label="Récurrent"
                        onInput={(event: InputEvent) => {
                            income.handleUpdateIncome("isRecurring")(event);
                            setIsRecuring(!isRecuring());
                        }}
                        checked={income.updateIncome().isRecurring}
                    />
                </div>
                <Show when={isRecuring()}>
                    <Select
                        label="Récurrence"
                        labelOptions="Sélectionner une récurrence"
                        options={recurrence}
                        onInput={income.handleUpdateIncome("frequency")}
                        value={income.updateIncome().frequency}
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties
                                    ?.frequency?.errors[0]
                            }
                        </Text>
                    )}
                </Show>
            </div>

            <div class="flex gap-2">
                <div class="flex flex-col">
                    <ToggleSwitch
                        label="Payé"
                        onInput={(event: InputEvent) => {
                            income.handleUpdateIncome("isPaid")(event);
                            setIsPaid(!isPaid());
                        }}
                        checked={income.updateIncome().isPaid}
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties?.isPaid
                                    ?.errors[0]
                            }
                        </Text>
                    )}
                </div>

                <Show when={isPaid()}>
                    <TextField
                        label="Date de paiement"
                        type="date"
                        onInput={income.handleUpdateIncome("isPaid")}
                        value={income.updateIncome().paidOn ? new Date(income.updateIncome().paidOn ?? "").toISOString().split("T")[0] : ""}
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties?.paidOn
                                    ?.errors[0]
                            }
                        </Text>
                    )}
                </Show>
            </div>

            <div class="flex justify-center p-4">
                <Button type="submit">Ajouter un revenu</Button>
            </div>
        </Form>
    );
}

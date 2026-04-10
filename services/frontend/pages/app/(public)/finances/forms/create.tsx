import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField, ToggleSwitch } from "@components/form";
import Text from "@components/text";
import { useFinance } from "@hooks/useFinance";
import { createSignal, Show } from "solid-js";

import { z } from "zod";

export function CreateOutcomeForm() {

    const [isRecuring, setIsRecuring] = createSignal<boolean>(false);
    const [isPaid, setIsPaid] = createSignal<boolean>(false);

    const propertiesList = [{ value: "", label: "", disabled: false }]
    const providersList = [{ value: "", label: "", disabled: false }]
    const categoryList = [{ value: "", label: "", disabled: false }]

    const outcome = useFinance();

    return (
        <Form callback={outcome.handleCreateOutcome}>

            <TextField
                label="Nom"
                name="name"
                onInput={outcome.handleInputOutcome("name")}
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
                    />

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties?.propertyId
                                    ?.errors[0]
                            }
                        </Text>
                    )}
                </div>

                <Select
                    label="Catégorie de dépense"
                    labelOptions="Sélectionner une catégorie"
                    options={categoryList}
                    onInput={outcome.handleInputOutcome("categoryId")}
                />

                {outcome.outcomeErrors() && (
                    <Text class="text-red-500">
                        {
                            z.treeifyError(outcome.outcomeErrors()!.error).properties?.categoryId
                                ?.errors[0]
                        }
                    </Text>
                )}

            </div>

            <Select
                label="Créancier"
                labelOptions="Sélectionner un créancier"
                options={providersList}
                onInput={outcome.handleInputOutcome("providerId")}
            />

            <TextField
                label="Date d'émission"
                type="date"
                name="issueDate"
                onInput={outcome.handleInputOutcome("issueDate")}
            />
            <div class="flex gap-5">
                <div class="flex flex-col">
                    <ToggleSwitch
                        label="Réccurent"
                        name="isRecuring"
                        onChange={(event: Event) => {
                            const checked = (event.target as HTMLInputElement).checked;
                            console.log("toggle fired, checked:", checked);
                            setIsRecuring(checked);
                        }}
                    />

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties?.isRecurring
                                    ?.errors[0]
                            }
                        </Text>
                    )}
                </div>
                <Show when={isRecuring()}>
                    <Select
                        label="Fréquence de paiement"
                        labelOptions={"Indiquer une fréquence de paiement"}
                        options={[]}
                        onInput={outcome.handleInputOutcome("frequency")}
                    ></Select>

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties?.frequency
                                    ?.errors[0]
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
                    />

                    {outcome.outcomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(outcome.outcomeErrors()!.error).properties?.isPaid
                                    ?.errors[0]
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

export function CreateIncomeForm() {

    const [isPaid, setIsPaid] = createSignal<boolean>(false);
    const [isRecuring, setIsRecuring] = createSignal<boolean>(false)

    const income = useFinance();
    const incomeCategory = [{ label: "", value: "", disabled: false }]
    const recurrence = [{ label: "", value: "", disabled: false }]
    const contractsList = [{ label: "", value: "", disabled: false }]

    return (
        <Form callback={income.handleCreateIncome}>
            <TextField label="Nom" onInput={income.handleInputIncome("name")} />

            {income.incomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.incomeErrors()!.error).properties?.name
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField label="Montant" onInput={income.handleInputIncome("amount")} />
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
                        onInput={income.handleInputIncome("contractId")}
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties?.contractId
                                    ?.errors[0]
                            }
                        </Text>
                    )}
                </div>
                <Select
                    label="Catégorie"
                    labelOptions="Sélectionner une catégorie"
                    options={incomeCategory}
                    onInput={income.handleInputIncome("incomeCategoryId")}
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

            <TextField
                label="Débiteur"
                onInput={income.handleInputIncome("issueDate")}
            />

            <TextField
                label="Date d'émission"
                type="date"
                onInput={income.handleInputIncome("issueDate")}
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
                        onInput={() => {
                            income.handleInputIncome("isRecurring");
                            setIsRecuring(!isRecuring());
                        }}
                    />
                </div>
                <Show when={isRecuring()}>
                    <Select
                        label="Récurrence"
                        labelOptions="Sélectionner une récurrence"
                        options={recurrence}
                        onInput={income.handleInputIncome("frequency")}
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties?.frequency
                                    ?.errors[0]
                            }
                        </Text>
                    )}
                </Show>
            </div>

            <div class="flex gap-2">
                <div class="flex flex-col">
                    <ToggleSwitch
                        label="Payé"
                        onInput={() => {
                            income.handleInputIncome("isPaid");
                            setIsPaid(!isPaid())
                        }}
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
                        onInput={income.handleInputIncome("isPaid")}
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
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

interface CreateOutcomeFormProps {
    close: () => void,
}

export function CreateOutcomeForm(props: CreateOutcomeFormProps) {
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
        <Form callback={() => outcome.handleCreateOutcome(props.close)} class="w-full">
            <TextField
                label="Nom"
                name="name"
                onInput={outcome.handleInputOutcome("name")}
                required
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
                required
            />

            {outcome.outcomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(outcome.outcomeErrors()!.error).properties?.amount
                            ?.errors[0]
                    }
                </Text>
            )}
            <div class="flex flex-col gap-2">
                <div class="flex flex-col">
                    <Select
                        label="Propriété concernée"
                        labelOptions="Sélectionner une proprieté"
                        options={propertiesList}
                        onInput={outcome.handleInputOutcome("propertyId")}
                        required
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
                    required
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
                required
            />

            <TextField
                label="Date d'émission"
                type="date"
                name="issueDate"
                onInput={outcome.handleInputOutcome("issueDate")}
                required
            />
            <div class="flex flex-col md:flex-row gap-5">
                <div class="flex flex-col">
                    <ToggleSwitch
                        label="Réccurent"
                        onInput={(event: InputEvent) => {
                            outcome.handleInputOutcome("isRecurring")(event);
                            setIsRecuring(!isRecuring());
                        }}
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
                        required
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
            <div class="flex flex-col md:flex-row gap-5">
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

interface CreateIncomeFormProps {
    close: () => void,
}


export function CreateIncomeForm(props: CreateIncomeFormProps) {
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
        label: `${contract.property.name} - ${contract.client.directory.firstName} ${contract.client.directory.name}`,
        value: contract.id,
        disabled: false,
    }))

    return (
        <Form callback={() => income.handleCreateIncome(props.close)} class="w-full">
            <TextField label="Nom" onInput={income.handleInputIncome("name")} required />

            {income.incomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.incomeErrors()!.error).properties?.name
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField label="Montant" onInput={income.handleInputIncome("amount")} required />
            {income.incomeErrors() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(income.incomeErrors()!.error).properties?.amount
                            ?.errors[0]
                    }
                </Text>
            )}
            <div class="flex-col md:flex-row gap-2">
                <div>
                    <Select
                        label="Contrat associé"
                        labelOptions="Sélectionner un contrat"
                        options={contractsList}
                        onInput={income.handleInputIncome("contractId")}
                        required
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
                        onInput={income.handleInputIncome("categoryId")}
                        required
                    />
                    {income.incomeErrors() && (
                        <Text class="text-red-500">
                            {
                                z.treeifyError(income.incomeErrors()!.error).properties
                                    ?.categoryId?.errors[0]
                            }
                        </Text>
                    )}
                </div>
            </div>

            <TextField
                label="Date d'émission"
                type="date"
                onInput={income.handleInputIncome("issueDate")}
                required
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
                            income.handleInputIncome("isRecurring")(event);
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
                        required
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
                            income.handleInputIncome("isPaid")(event);
                            setIsPaid(!isPaid());
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
                        required
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

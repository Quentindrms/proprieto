import type { Contract } from "@app/types/contract";
import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useContract } from "@hooks/useContract";
import { z } from "zod";


interface RenewFormProps {
    contract: Contract;
}

export default function RenewForm(props: RenewFormProps) {
    const contract = useContract();

    const startDate = new Date(props.contract.endDate);
    startDate.setDate(startDate.getDate() + 1);

    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);

    const renewal = contract.setCreateContract({
        clientId: props.contract.clientId,
        propertyId: props.contract.propertyId,
        lease: props.contract.lease,
        startDate,
        endDate,
    })

    return (
        <Form callback={contract.create}>
            <div class="flex flex-col sm:flex-row gap-3">
                <div class="w-full">
                    <TextField
                        type="date"
                        label="Date de début du contrat"
                        onInput={contract.handleCreateInput("startDate")}
                        value={renewal.startDate.toLocaleDateString("fr-CA")}
                        required
                    />
                    {contract.formError() && (
                        <span class="text-red-500">
                            {
                                z.treeifyError(contract.formError()!.error)
                                    ?.properties?.startDate?.errors
                            }
                        </span>
                    )}
                </div>
                <div class="w-full">
                    <TextField
                        type="date"
                        label="Date de fin du contrat"
                        onInput={contract.handleCreateInput("endDate")}
                        value={renewal.endDate.toLocaleDateString("fr-CA")}
                        required
                    />
                    {contract.formError() && (
                        <span class="text-red-500">
                            {
                                z.treeifyError(contract.formError()!.error).properties?.endDate
                                    ?.errors
                            }
                        </span>
                    )}
                </div>
            </div>

            <TextField
                type="number"
                label="Loyer mensuel"
                onInput={contract.handleCreateInput("lease")}
                value={renewal.lease}
                required
            />
            {contract.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(contract.formError()!.error).properties?.lease
                            ?.errors[0]
                    }
                </span>
            )}
            <div class="flex flex-col sm:flex-row gap-3">
                <div class="w-full">
                    <Select
                        label="Propriété louée"
                        labelOptions="Sélectionner une propriété"
                        options={[{ value: props.contract.property.id, label: `${props.contract.property.name}`, disabled: false }]}
                        onInput={contract.handleCreateInput("propertyId")}
                        required
                    />

                </div>
                <div class="w-full">
                    <Select
                        label="Client concerné"
                        labelOptions="Sélectionner un client"
                        options={[{ value: props.contract.client.id, label: `${props.contract.client.directory.firstName} ${props.contract.client.directory.name}`, disabled: false }]}
                        onInput={contract.handleCreateInput("clientId")}
                        required
                    />
                </div>
            </div>

            <div class="flex justify-center p-4">
                <Button type="submit">Créer le contrat</Button>
            </div>
        </Form>
    );
}

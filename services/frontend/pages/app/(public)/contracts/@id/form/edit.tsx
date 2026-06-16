import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useContract } from "@hooks/useContract";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "../+data";


export default function EditForm() {

    const contract = useContract();
    const data = useData<Data>();

    contract.setUpdateContract({
        id: data.contract.id,
        startDate: data.contract.startDate,
        endDate: data.contract.endDate,
        lease: data.contract.lease,
    })


    return (
        <Form callback={contract.update}>
            <div class="flex flex-col sm:flex-row gap-3">
                <div class="w-full">
                    <TextField
                        type="date"
                        label="Date de début du contrat"
                        onInput={contract.handleUpdateInput("startDate")}
                        value={new Date(data.contract.startDate).toLocaleDateString("fr-CA")}
                        required
                    />
                    {contract.formError() && (
                        <span class="text-red-500">
                            {
                                z.treeifyError(contract.formError()!.error).properties?.startDate
                                    ?.errors[0]
                            }
                        </span>
                    )}
                </div>
                <div class="w-full">
                    <TextField
                        type="date"
                        label="Date de fin du contrat"
                        onInput={contract.handleUpdateInput("endDate")}
                        value={new Date(data.contract.endDate).toLocaleDateString("fr-CA")}
                        required
                    />
                    {contract.formError() && (
                        <span class="text-red-500">
                            {
                                z.treeifyError(contract.formError()!.error).properties?.endDate
                                    ?.errors[0]
                            }
                        </span>
                    )}
                </div>
            </div>

            <TextField
                type="number"
                label="Loyer mensuel"
                onInput={contract.handleUpdateInput("lease")}
                value={data.contract.lease}
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

            <div class="flex justify-center p-4">
                <Button type="submit">Créer le contrat</Button>
            </div>
        </Form>
    )
}
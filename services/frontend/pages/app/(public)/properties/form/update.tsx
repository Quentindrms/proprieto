import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { usePropertyContext } from "@hooks/useProperty";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "../+data";

interface UpdateProperty {
    onSuccess: () => void,
}

export default function UpdateProperty(props: UpdateProperty) {
    const property = usePropertyContext();

    const data = useData<Data>();

    const propertyTypes = data.propertyTypes.map((type) => ({
        value: type.id,
        label: type.name,
        disabled: false,
    }));

    return (
        <Form callback={() => { property.update(props.onSuccess) }} class="w-full">
            <TextField
                label="Nom"
                name="name"
                onInput={property.handleUpdateInput("name")}
                value={property.updateProperty().name}
                required
            />
            {property.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(property.formError()!.error).properties?.name
                            ?.errors[0]
                    }
                </span>
            )}
            <div class="flex gap-3">
                <div>
                    <TextField
                        label="Prix d'acquisition"
                        name="purshacePrice"
                        onInput={property.handleUpdateInput("purchasePrice")}
                        value={property.updateProperty().purchasePrice}
                        required
                    />
                    {property.formError() && (
                        <span class="text-red-500">
                            {
                                z.treeifyError(property.formError()!.error).properties
                                    ?.purchasePrice?.errors[0]
                            }
                        </span>
                    )}
                </div>
                <div>
                    <TextField
                        label="Date d'acquisition"
                        type="date"
                        name="purshaceDate"
                        onInput={property.handleUpdateInput("purchaseDate")}
                        value={property.updateProperty().purchaseDate ? new Date(property.updateProperty().purchaseDate ?? "").toISOString().split("T")[0] : ""}
                        required
                    />
                    {property.formError() && (
                        <span class="text-red-500">
                            {
                                z.treeifyError(property.formError()!.error).properties?.purchaseDate
                                    ?.errors[0]
                            }
                        </span>
                    )}
                </div>
            </div>

            <Select
                label="Type de bien"
                labelOptions="Sélectionner un type de bien"
                options={propertyTypes}
                onInput={property.handleCreateInput("type")}
                value={property.updateProperty().type}
                required
            />
            <div class="flex justify-center p-2">
                <Button type="submit">Créer une nouvelle propriété</Button>
            </div>
        </Form>
    );
}

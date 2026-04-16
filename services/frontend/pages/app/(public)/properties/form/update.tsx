import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { usePropertyContext } from "@hooks/useProperty";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "../+data";

export default function UpdateProperty() {
    const property = usePropertyContext();

    const data = useData<Data>();

    const propertyTypes = data.propertyTypes.map((type) => ({
        value: type.id,
        label: type.name,
        disabled: false,
    }));

    return (
        <Form callback={property.update}>
            <TextField
                label="Nom"
                name="name"
                onInput={property.handleUpdateInput("name")}
                value={property.updateProperty().name}
            />
            {property.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(property.formError()!.error).properties?.name
                            ?.errors[0]
                    }
                </span>
            )}

            <TextField
                label="Prix d'acquisition"
                name="purshacePrice"
                onInput={property.handleUpdateInput("purchasePrice")}
                value={property.updateProperty().purchasePrice}
            />
            {property.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(property.formError()!.error).properties
                            ?.purchasePrice?.errors[0]
                    }
                </span>
            )}

            <TextField
                label="Date d'acquisition"
                type="date"
                name="purshaceDate"
                onInput={property.handleUpdateInput("purchaseDate")}
                value={property.updateProperty().purchaseDate ? new Date(property.updateProperty().purchaseDate ?? "").toISOString().split("T")[0] : ""}
            />
            {property.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(property.formError()!.error).properties?.purchaseDate
                            ?.errors[0]
                    }
                </span>
            )}

            <Select
                label="Type de bien"
                labelOptions="Sélectionner un type de bien"
                options={propertyTypes}
                onInput={property.handleCreateInput("type")}
                value={property.updateProperty().type}
            />
            <div class="flex justify-center p-2">
                <Button type="submit">Créer une nouvelle propriété</Button>
            </div>
        </Form>
    );
}

import type { Property } from "@app/types/property";
import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useProperty } from "@hooks/useProperty";
import { createEffect } from "solid-js";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "../+data";

interface UpdateProperty {
    property: Property;
    onSuccess: () => void;
}

export default function EditModal(props: UpdateProperty) {
    const property = useProperty();

    createEffect(() => {
        property.setUpdateProperty({
            id: props.property.id,
            name: props.property.name,
            purchasePrice: props.property.purchasePrice,
            purchaseDate: props.property.purchaseDate,
            sellPrice: props.property.sellPrice,
            type: props.property.propertyType.id,
        });
    });

    const data = useData<Data>();

    const propertyTypes = data.propertyType.map((type) => ({
        value: type.id,
        label: type.name,
        disabled: false,
    }));

    return (
        <Form
            callback={() => {
                property.update(props.onSuccess);
            }}
            class="w-full"
        >
            <TextField
                label="Nom"
                name="name"
                onInput={property.handleUpdateInput("name")}
                value={props.property.name}
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
                        value={props.property.purchasePrice}
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
                        value={
                            property.updateProperty().purchaseDate
                                ? new Date(property.updateProperty().purchaseDate ?? "")
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                        }
                        required
                    />
                    {property.formError() && (
                        <span class="text-red-500">
                            {
                                z.treeifyError(property.formError()!.error).properties
                                    ?.purchaseDate?.errors[0]
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
                value={props.property.propertyType.slug}
                required
            />

            <div class="flex justify-center p-2">
                <Button type="submit">Modifier la propriété</Button>
            </div>
        </Form>
    );
}

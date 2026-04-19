import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import { useProviderContext } from "@hooks/useProvider";
import { createEffect } from "solid-js/types/server/reactive.js";
import { z } from "zod";

export default function EditForm() {
    const provider = useProviderContext();


    return (
        <Form callback={provider.create}>
            <TextField label="Nom" onInput={provider.handleUpdateInput("name")} value={provider.updateProvider().name} />

            <TextField
                label="Prénom"
                onInput={provider.handleUpdateInput("firstName")}
                value={provider.updateProvider().firstName}
            />

            {provider.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(provider.formError()!.error).properties?.firstName
                            ?.errors[0]
                    }
                </span>
            )}

            <TextField
                type="email"
                label="Email"
                onInput={provider.handleUpdateInput("email")}
                value={provider.updateProvider().email}
            />

            {provider.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(provider.formError()!.error).properties?.email
                            ?.errors[0]
                    }
                </span>
            )}

            <TextField
                label="Addresse"
                onInput={provider.handleUpdateInput("address")}
                value={provider.updateProvider().address}
            />

            {provider.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(provider.formError()!.error).properties?.address
                            ?.errors[0]
                    }
                </span>
            )}

            <TextField
                type="tel"
                label="Téléphone"
                onInput={provider.handleUpdateInput("phone")}
                value={provider.updateProvider().phone}
            />

            {provider.formError() && (
                <span class="text-red-500">
                    {
                        z.treeifyError(provider.formError()!.error).properties?.phone
                            ?.errors[0]
                    }
                </span>
            )}

            <div class="flex justify-center p-4">
                <Button type="submit">Créer un créancier</Button>
            </div>
        </Form>
    );
}

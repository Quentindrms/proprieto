import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import Text from "@components/text";
import { useClient, useClientContext } from "@hooks/useClient";
import { z } from "zod";

export default function EditForm() {
    const client = useClientContext();
    client.setUpdateClient(client.clientDetails())

    return (
        <Form callback={client.update}>
            <TextField label="Nom" onInput={client.handleUpdateClient("name")} value={client.clientDetails().name} />

            {client.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(client.formError()!.error).properties?.name
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField label="Prénom" onInput={client.handleUpdateClient("firstName")} value={client.clientDetails().firstName} />

            {client.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(client.formError()!.error).properties?.firstName
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField
                label="Adresse mail"
                type="email"
                onInput={client.handleUpdateClient("email")}
                value={client.clientDetails().email}
            />

            {client.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(client.formError()!.error).properties?.email
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField label="Adresse" onInput={client.handleUpdateClient("address")} value={client.clientDetails().address} />

            {client.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(client.formError()!.error).properties?.address
                            ?.errors[0]
                    }
                </Text>
            )}

            <TextField
                label="Téléphone"
                type="tel"
                onInput={client.handleUpdateClient("phone")}
                value={client.clientDetails().phone}
            />

            {client.formError() && (
                <Text class="text-red-500">
                    {
                        z.treeifyError(client.formError()!.error).properties?.phone
                            ?.errors[0]
                    }
                </Text>
            )}

            <div class="flex justify-center p-4">
                <Button type="submit">Créer</Button>
            </div>
        </Form>
    );
}

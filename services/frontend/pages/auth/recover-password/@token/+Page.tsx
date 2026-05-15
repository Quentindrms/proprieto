import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import Heading from "@components/heading";
import Text from "@components/text";
import { useAuth } from "@hooks/useAuth";
import { redirect } from "vike/abort";
import { useData } from "vike-solid/useData";
import * as z from "zod";
import type { Data } from "./+data";

export default function RecoverPassword() {
    const data = useData<Data>();
    const auth = useAuth();

    if (data.response.isUsed === true) {
        throw redirect("/auth/login");
    }

    return (
        <div class="flex flex-col w-dvw items-center justify-center">
            <Heading components="h1" size="extra-large" class="p-5">
                Réinitilisation du mot de passe
            </Heading>
            <Form class="flex flex-col gap-3" callback={auth.handleRecoverPassword}>
                <TextField
                    type="password"
                    label="Nouveau mot de passe"
                    onInput={auth.handleRecoverPasswordInputChange("password")}
                />
                {auth.formError() && (
                    <Text class="text-red-500">
                        {
                            z.treeifyError(auth.formError()!.error).properties?.password
                                ?.errors[0]
                        }
                    </Text>
                )}

                <TextField
                    type="password"
                    label="Confirmation du mot de passe"
                    onInput={auth.handleRecoverPasswordInputChange("passwordValidation")}
                />
                {auth.formError() && (
                    <Text class="text-red-500">
                        {
                            z.treeifyError(auth.formError()!.error).properties?.passwordValidation
                                ?.errors[0]
                        }
                    </Text>
                )}

                <div class="flex justify-center">
                    <Button type="submit">Réinitialiser le mot de passe</Button>
                </div>
            </Form>
        </div>
    );
}

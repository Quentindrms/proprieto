import { ActionButton, Button } from "@components/button";
import { Form, TextField } from "@components/form";
import Text from "@components/text";
import { useAuth } from "@hooks/useAuth";

export default function ForgetPasswordForm() {

    const auth = useAuth();

    return (
        <>
            <div class="absolute top-6 left-6">
                <a href="/auth/login">
                    <ActionButton color="outline">Connexion</ActionButton>
                </a>
            </div>

            <div class="flex flex-wrap justify-center items-center gap-3 w-xs md:w-md lg:w-lg">
                <Form callback={auth.handleForgetPassword}>
                    <Text class="text-muted-text italic" size="extra-small">Saissez l'adresse email associé à votre compte et nous vous transmettrons les informations pour réintialiser votre mot de passe</Text>
                    <TextField required type="email" label="Adresse email" onInput={auth.handleEmailInputChange} />
                    <div class="flex justify-center items-center p-2">
                        <Button type="submit">Réinitialiser le mot de passe</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
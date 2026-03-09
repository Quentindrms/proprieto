import { Button } from "../../../../../components/button";
import { TextField } from "../../../../../components/form";

export default function LoginForm() {

    return (
        <div class="flex flex-col gap-3 p-2 w-lg bg-background-surface border border-background-border rounded-xl shadow-md shadow-background-border">
            <TextField label="Adrese email" type="email" />
            <TextField label="Mot de passe" type="password" />
            <div class="flex justify-center">
                <Button type="submit">Connexion</Button>
            </div>
        </div>
    )
}
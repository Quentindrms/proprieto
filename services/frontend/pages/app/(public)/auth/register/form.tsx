import { Button } from "../../../../../components/button";
import { TextField } from "../../../../../components/form";

export default function RegisterForm() {

    return (
        <div class="flex flex-col gap-3 p-2 w-lg bg-background-surface border border-background-border rounded-xl shadow-md shadow-background-border">
            <TextField label="Nom" />
            <TextField label="Prénom" />
            <TextField label="Adresse email" type="email" />
            <TextField label="Téléphone" type="tel" />
            <TextField label="Mot de passe" type="password" />
            <TextField label="Conformation du mot de passe" type="password" />
            <div class="flex justify-center">
                <Button type="submit">S'inscrire</Button>
            </div>
        </div>
    )
}
import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import RegisterForm from "./form";

export default function Page() {

    return (
        <div class="relative h-dvh w-full flex flex-col justify-center items-center gap-4">
            <div class="absolute top-6 left-6">
                <a href="/auth/login">
                    <ActionButton color="outline">Connexion</ActionButton>
                </a>
            </div>
            <Heading components="h1" size="extra-large" fontClasses="extra-bold">Inscription</Heading>
            <RegisterForm />
        </div>
    )
}
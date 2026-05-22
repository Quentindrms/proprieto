import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import RegisterForm from "./form";

export default function Page() {

    return (
        <div class="flex flex-col min-h-dvh w-full">
            <div class="p-4">
                <a href="/auth/login">
                    <ActionButton color="outline">Connexion</ActionButton>
                </a>
            </div>
            <div class="flex flex-1 flex-col gap-4 justify-center items-center p-4 pb-8">
                <Heading components="h1" size="extra-large" fontClasses="extra-bold">Inscription</Heading>
                <RegisterForm />
            </div>
        </div>
    )
}
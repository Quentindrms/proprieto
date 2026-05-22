import Heading from "@components/heading";
import ForgetPasswordForm from "./form";

export default function ForgetPassword() {

    return (
        <div class="flex flex-col min-h-dvh w-dvw">
            <div class="flex flex-1 flex-col gap-4 justify-center items-center p-4 pb-8">
                <Heading components="h1" size="extra-large" color="black" fontClasses="bold">Mot de passe oublié</Heading>
                <ForgetPasswordForm />
            </div>
        </div>
    )
}
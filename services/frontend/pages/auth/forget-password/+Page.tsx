import Heading from "@components/heading";
import ForgetPasswordForm from "./form";

export default function ForgetPassword() {

    return (
        <div class="relative flex flex-col gap-4 justify-center items-center w-dvw h-dvh">
            <Heading components="h1" size="extra-large" color="black" fontClasses="bold">Mot de passe oublié</Heading>
            <ForgetPasswordForm />
        </div>
    )
}
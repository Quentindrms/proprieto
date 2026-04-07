import Heading from "@components/heading";
import RegisterForm from "./form";

export default function Page() {

    return (
        <div class="h-dvh w-full flex flex-col justify-center items-center gap-4">
            <Heading components="h1" size="extra-large" fontClasses="extra-bold">Inscription</Heading>
            <RegisterForm />
        </div>
    )
}
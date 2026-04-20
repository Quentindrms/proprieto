import { ActionButton } from "./button";
import Heading from "./heading";
import Text from "./text";

export default function Navbar() {

    return (
        <div class="w-2xs h-dvh flex flex-col">
            <div class="flex flex-col p-4">
                <Heading components="h1" size="extra-large" fontClasses="bold">Proprieto</Heading>
                <Text size="small" class="text-muted-text font-base-regular">Gestionnaire de propriété</Text>
            </div>
            <div class="flex flex-col text-left">
                <NavbarLink name="Portefeuille" value="/app" />
                <NavbarLink name="Propriété" value="/app/properties" />
                <NavbarLink name="Contrats" value="/app/contracts" />
                <NavbarLink name="Clients" value="/app/clients" />
                <NavbarLink name="Prestataires" value="/app/contractors" />
                <NavbarLink name="Finances" value="/app/finances" />
            </div>
            <div class="mt-auto p-2">
                <ActionButton class="mt-auto" color="outline">Déconnexion</ActionButton>
            </div>
        </div>
    )
}

interface NavbarLinkProps {
    name: string,
    value: string,
}

export function NavbarLink(props: NavbarLinkProps) {

    return (
        <a href={props.value} class="text-xl p-3 rounded-md font-base-bold text-muted-text hover:bg-muted-text/10 hover:text-dark">
            {props.name}</a>
    )
}
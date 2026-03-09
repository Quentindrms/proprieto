import Heading from "./heading";
import Text from "./text";

export default function Navbar() {

    return (
        <div class="w-xs p-2 flex flex-col border-r border-background-border">
            <div class="text-center p-3">
                <Heading components="h1" size="big"><a href="/app">Proprieto</a></Heading>
                <Text components="p">Gestion immobilière</Text>
            </div>

            <div class="flex flex-col gap-2">
                <Heading components="h2" size="large" color="white">Vue générale</Heading>
                <NavbarLink name="Tableau de bord" value="/app/" />

                <Heading components="h2" size="large" color="white">Patrimoine</Heading>
                <NavbarLink name="Propriétés" value="/app/" />
                <NavbarLink name="Contrats" value="/app/" />

                <Heading components="h2" size="large" color="white">Finances</Heading>
                <NavbarLink name="Revenus" value="/app/" />
                <NavbarLink name="Dépense" value="/app/" />

                <Heading components="h2" size="large" color="white">Contacts</Heading>
                <NavbarLink name="Clients" value="/app/" />
                <NavbarLink name="Prestataires" value="/app/" />

                <Heading components="h2" size="large" color="white">Compte</Heading>
                <NavbarLink name="Paramètres" value="/app/" />
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
        <a href={props.value} class="text-primary hover:text-solid-gold-hover text-medium pl-2">
            {props.name}</a>
    )
}
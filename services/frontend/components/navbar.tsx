import { onLogout } from "@hooks/useAuth.telefunc";
import clsx from "clsx";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import { ActionButton } from "./button";
import Heading from "./heading";
import Text from "./text";

export default function Navbar() {
    const [isOpen, setIsOpen] = createSignal<boolean>(false);

    async function handleLogout() {
        const response = await onLogout();
        if (!response) {
            toast.error("Une erreur est survenue lors de la déconnexion");
            return;
        }
        toast.success("Vous avez été déconnecté");
        await reload();
        return;
    }

    const NavLinks = () => (
        <>
            <NavbarLink name="Portefeuille" value="/app" />
            <NavbarLink name="Propriété" value="/app/properties" />
            <NavbarLink name="Contrats" value="/app/contracts" />
            <NavbarLink name="Clients" value="/app/clients" />
            <NavbarLink name="Prestataires" value="/app/contractors" />
            <NavbarLink name="Finances" value="/app/finances" />
        </>
    );

    return (
        <>
            {/* Burger button — visible on sm/md only */}
            <div class="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen())}
                    class="relative w-9 h-9 rounded-md border border-slate-strong bg-background-base"
                    aria-label="Menu"
                    type="button"
                >
                    <span class={clsx("absolute left-2 right-2 h-px bg-dark transition-all duration-300 origin-center", isOpen() ? "top-1/2 rotate-45" : "top-[11px]")} />
                    <span class={clsx("absolute left-2 right-2 h-px bg-dark top-1/2 transition-all duration-300", isOpen() ? "opacity-0 scale-x-0" : "opacity-100")} />
                    <span class={clsx("absolute left-2 right-2 h-px bg-dark transition-all duration-300 origin-center", isOpen() ? "top-1/2 -rotate-45" : "top-[25px]")} />
                </button>
            </div>

            {/* Backdrop */}
            <button
                type="button"
                onClick={() => setIsOpen(false)}
                class={clsx(
                    "lg:hidden fixed inset-0 z-40 bg-dark/10 transition-opacity duration-300",
                    isOpen() ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            />

            {/* Drawer sm/md */}
            <div class={clsx(
                "lg:hidden fixed top-0 left-0 z-40 h-dvh w-2xs flex flex-col bg-background-base border-r border-slate-strong shadow-sm transition-transform duration-300",
                isOpen() ? "translate-x-0" : "-translate-x-full"
            )}>
                <div class="flex flex-col p-4 pt-16">
                    <Heading components="h1" size="extra-large" fontClasses="bold">
                        Proprieto
                    </Heading>
                    <Text size="small" class="text-muted-text font-base-regular">
                        Gestionnaire de propriété
                    </Text>
                </div>
                <div class="flex flex-col text-left">
                    <NavLinks />
                </div>
                <div class="mt-auto p-2">
                    <ActionButton color="outline" onClick={handleLogout}>
                        Déconnexion
                    </ActionButton>
                </div>
            </div>

            {/* Sidebar lg+ */}
            <div class="hidden w-2xs h-dvh lg:flex flex-col">
                <div class="flex flex-col p-4">
                    <Heading components="h1" size="extra-large" fontClasses="bold">
                        Proprieto
                    </Heading>
                    <Text size="small" class="text-muted-text font-base-regular">
                        Gestionnaire de propriété
                    </Text>
                </div>
                <div class="flex flex-col text-left">
                    <NavLinks />
                </div>
                <div class="mt-auto p-2">
                    <ActionButton color="outline" onClick={handleLogout}>
                        Déconnexion
                    </ActionButton>
                </div>
            </div>
        </>
    );
}

interface NavbarLinkProps {
    name: string;
    value: string;
}

export function NavbarLink(props: NavbarLinkProps) {
    return (
        <a
            href={props.value}
            class="text-xl p-3 rounded-md font-base-bold text-muted-text hover:bg-muted-text/10 hover:text-dark"
        >
            {props.name}
        </a>
    );
}

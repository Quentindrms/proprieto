import { onLogout } from "@hooks/useAuth.telefunc";
import { ImCross } from "solid-icons/im";
import { createSignal, Show } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import { ActionButton } from "./button";
import Heading from "./heading";
import Text from "./text";

export default function Navbar() {
    const [isOpen, setIsOpen] = createSignal(false);

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

    function close() {
        setIsOpen(false);
    }

    return (
        <>
            {/* Bouton burger — visible uniquement quand la sidebar est fermée */}
            <Show when={!isOpen()}>
                <button
                    class="lg:hidden fixed top-4 left-4 z-50 flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                    aria-label="Ouvrir le menu"
                    type="button"
                >
                    <span class="block h-0.5 bg-dark rounded" />
                    <span class="block h-0.5 bg-dark rounded" />
                    <span class="block h-0.5 bg-dark rounded" />
                </button>
            </Show>

            {/* Overlay sombre */}
            <Show when={isOpen()}>
                <button class="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={close} type="button" />
            </Show>

            {/* Sidebar */}
            <div
                class={`
                flex flex-col w-2xs h-dvh bg-background-base lg:bg-background-base/0
                fixed lg:static inset-y-0 left-0 z-40
                transition-transform duration-300
                ${isOpen() ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            >
                <div class="flex items-start justify-between p-4">
                    <div class="flex flex-col">
                        <Heading components="h1" size="extra-large" fontClasses="bold">
                            Proprieto
                        </Heading>
                        <Text size="small" class="text-muted-text font-base-regular">
                            Gestionnaire de propriété
                        </Text>
                    </div>
                    {/* Bouton fermer — visible uniquement mobile/tablette */}
                    <button
                        class="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer mt-1 shrink-0"
                        onClick={close}
                        aria-label="Fermer le menu"
                        type="button"
                    >
                        <ImCross color="var(--color-background-dark)" />
                    </button>
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
                    <ActionButton class="mt-auto" color="outline" onClick={handleLogout}>
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
            class="inline-block text-xl p-3 rounded-md font-base-bold text-muted-text hover:bg-muted-text/10 hover:text-dark hover:translate-x-2 transition-transform duration-150"
        >
            {props.name}
        </a>
    );
}

import { Button } from "@components/button";
import Heading from "@components/heading";
import Text from "@components/text";

export default function Page() {
    return (
        <div class="min-h-screen w-full bg-background-base">

            {/* Header */}
            <header class="flex items-center justify-between px-8 py-5 border-b border-slate-strong">
                <a href="/" class="flex flex-col">
                    <Heading components="h1" size="extra-large" fontClasses="bold">
                        Proprieto
                    </Heading>
                    <Text size="small" class="text-muted-text font-base-regular">
                        Gestionnaire de propriété
                    </Text>
                </a>
                <a href="/auth/login">
                    <Button type="button" color="blue">Se connecter</Button>
                </a>
            </header>

            {/* Content */}
            <main class="max-w-3xl mx-auto px-8 py-16 flex flex-col gap-10">

                <div class="flex flex-col gap-2">
                    <Heading components="h1" size="extra-large" fontClasses="extra-bold">
                        Mentions légales
                    </Heading>
                    <Text size="small" class="text-muted-text font-base-regular">
                        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                    </Text>
                </div>

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        1. Éditeur du site
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Le site Proprieto est édité par Quentin Derimais, domicilié en France.
                    </Text>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Contact : quentin.derimais@gmail.com
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        2. Hébergement
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Le site est hébergé par un prestataire tiers. Les coordonnées de l'hébergeur sont disponibles sur demande à l'adresse indiquée ci-dessus.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        3. Propriété intellectuelle
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'ensemble des éléments constituant le site Proprieto (textes, graphismes, logiciels, icônes, sons, images) est la propriété exclusive de l'éditeur. Toute reproduction, représentation, modification ou exploitation non autorisée de tout ou partie du site est strictement interdite.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        4. Données personnelles
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Les données collectées via Proprieto (adresse e-mail, nom, prénom) sont utilisées exclusivement dans le cadre du service de gestion immobilière. Elles ne sont ni vendues ni transmises à des tiers.
                    </Text>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à l'adresse mentionnée à l'article 1.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        5. Cookies
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Le site utilise des cookies strictement nécessaires au fonctionnement du service (gestion de la session d'authentification). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        6. Limitation de responsabilité
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, il ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition et décline toute responsabilité pour toute imprécision ou omission portant sur des informations disponibles sur le site.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        7. Droit applicable
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.
                    </Text>
                </div>

                <div class="pt-4">
                    <a href="/">
                        <Button type="button" color="blue">Retour à l'accueil</Button>
                    </a>
                </div>

            </main>

            {/* Footer */}
            <footer class="flex flex-wrap items-center justify-between gap-4 border-t border-slate-strong px-8 py-6">
                <Heading components="h3" size="base" fontClasses="bold">Proprieto</Heading>
                <Text size="small" class="text-muted-text font-base-regular">
                    © {new Date().getFullYear()} Proprieto. Tous droits réservés.
                </Text>
            </footer>

        </div>
    );
}

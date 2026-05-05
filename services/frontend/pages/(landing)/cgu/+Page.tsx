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
                        Conditions Générales d'Utilisation
                    </Heading>
                    <Text size="small" class="text-muted-text font-base-regular">
                        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                    </Text>
                </div>

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        1. Objet
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités d'accès et d'utilisation de la plateforme Proprieto, service de gestion immobilière en ligne accessible à l'adresse du site.
                    </Text>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Toute utilisation du service implique l'acceptation pleine et entière des présentes CGU.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        2. Accès au service
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'accès à Proprieto est réservé aux personnes physiques majeures ou aux personnes morales dûment représentées. La création d'un compte est nécessaire pour accéder aux fonctionnalités de la plateforme.
                    </Text>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'utilisateur est responsable de la confidentialité de ses identifiants de connexion. Toute utilisation du compte avec ses identifiants est réputée effectuée par l'utilisateur lui-même.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        3. Description du service
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Proprieto est une plateforme de gestion immobilière permettant à ses utilisateurs de :
                    </Text>
                    <ul class="flex flex-col gap-2 pl-4">
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Gérer un portefeuille de biens immobiliers</Text>
                        </li>
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Créer et suivre des contrats de location</Text>
                        </li>
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Gérer les locataires et leurs coordonnées</Text>
                        </li>
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Suivre les revenus, dépenses et flux financiers</Text>
                        </li>
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Gérer un carnet d'adresses de prestataires</Text>
                        </li>
                    </ul>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        4. Obligations de l'utilisateur
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'utilisateur s'engage à utiliser le service de manière loyale et conformément à sa destination. Il est notamment interdit de :
                    </Text>
                    <ul class="flex flex-col gap-2 pl-4">
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Renseigner des données fausses ou trompeuses</Text>
                        </li>
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Tenter de compromettre la sécurité de la plateforme</Text>
                        </li>
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Partager ses identifiants avec des tiers</Text>
                        </li>
                        <li class="flex gap-2">
                            <Text size="base" class="text-muted-text">—</Text>
                            <Text size="base" class="text-muted-text leading-relaxed">Utiliser le service à des fins illicites ou contraires à l'ordre public</Text>
                        </li>
                    </ul>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        5. Données personnelles
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Les données personnelles collectées lors de l'inscription et de l'utilisation du service sont traitées conformément à notre politique de confidentialité et au RGPD. L'utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données en contactant l'éditeur.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        6. Disponibilité du service
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'éditeur s'efforce d'assurer la disponibilité du service 24h/24 et 7j/7, sans toutefois s'y engager contractuellement. Des interruptions de service peuvent intervenir pour des raisons de maintenance ou de force majeure.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        7. Responsabilité
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le service, ni de l'exactitude des données saisies par l'utilisateur.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        8. Résiliation
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'utilisateur peut supprimer son compte à tout moment en contactant l'éditeur. L'éditeur se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        9. Modification des CGU
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        L'éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle. La poursuite de l'utilisation du service après notification vaut acceptation des nouvelles CGU.
                    </Text>
                </div>

                <div class="w-full h-px bg-slate-strong" />

                <div class="flex flex-col gap-3">
                    <Heading components="h2" size="large" fontClasses="bold">
                        10. Droit applicable
                    </Heading>
                    <Text size="base" class="text-muted-text leading-relaxed">
                        Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution relèvera de la compétence exclusive des tribunaux français.
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
                <div class="flex items-center gap-6">
                    <a href="/mentions-legales">
                        <Text size="small" class="text-muted-text font-base-regular hover:text-dark transition-colors">Mentions légales</Text>
                    </a>
                    <a href="/cgu">
                        <Text size="small" class="text-muted-text font-base-regular hover:text-dark transition-colors">CGU</Text>
                    </a>
                    <Text size="small" class="text-muted-text font-base-regular">
                        © {new Date().getFullYear()} Proprieto. Tous droits réservés.
                    </Text>
                </div>
            </footer>

        </div>
    );
}

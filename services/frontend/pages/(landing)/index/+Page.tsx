import { Badge } from "@components/badge";
import { Button } from "@components/button";
import { CardProgressionBar, CardRevenue, CardTicket } from "@components/dataCard";
import Heading from "@components/heading";
import Text from "@components/text";

export default function Page() {
    return (
        <div class="min-h-screen w-full bg-background-base">

            <header class="flex items-center justify-between px-8 py-5 border-b border-slate-strong">
                <div class="flex flex-col">
                    <Heading components="h1" size="extra-large" fontClasses="bold">
                        Proprieto
                    </Heading>
                    <Text size="small" class="text-muted-text font-base-regular">
                        Gestionnaire de propriété
                    </Text>
                </div>
                <a href="/auth/login">
                    <Button type="button" color="blue">Se connecter</Button>
                </a>
            </header>

            <section class="bg-background-primary px-8 py-24 flex flex-col items-center text-center gap-6">
                <Badge color="primary">Gestion immobilière simplifiée</Badge>
                <Heading components="h2" size="big" color="white" fontClasses="extra-bold" class="max-w-2xl leading-tight">
                    Gérez votre patrimoine immobilier en un seul endroit
                </Heading>
                <Text size="medium" class="text-muted-text max-w-xl leading-relaxed">
                    Proprieto centralise vos biens, contrats, locataires et finances pour vous faire gagner du temps et de la sérénité.
                </Text>
                <div class="flex gap-4 flex-wrap justify-center pt-2">
                    <a href="/auth/login">
                        <Button type="button" color="blue">Accéder à mon espace</Button>
                    </a>
                    <a href="/auth/register">
                        <Button type="button" color="green">Créer un compte</Button>
                    </a>
                </div>
            </section>

            <section class="px-8 py-20 max-w-5xl mx-auto flex flex-col gap-14">

                <div class="flex flex-col items-center text-center gap-3">
                    <Heading components="h2" size="extra-large" fontClasses="bold">
                        Tout ce dont vous avez besoin
                    </Heading>
                    <Text size="base" class="text-muted-text max-w-lg">
                        Une plateforme complète pour piloter votre portefeuille immobilier de A à Z.
                    </Text>
                </div>

                <div class="flex flex-col md:flex-row items-center gap-10">
                    <div class="flex flex-col gap-3 flex-1">
                        <Badge color="success">Finances</Badge>
                        <Heading components="h3" size="large" fontClasses="bold">
                            Suivez vos revenus et dépenses
                        </Heading>
                        <Text size="base" class="text-muted-text leading-relaxed">
                            Visualisez en un coup d'œil la performance financière de chaque bien. Revenus locatifs, charges et rentabilité globale centralisés.
                        </Text>
                    </div>
                    <div class="flex flex-col gap-3 flex-1">
                        <CardRevenue title="Revenus du mois" stat={3200} comment="+12% ce mois-ci" dynamic={true} />
                        <CardProgressionBar title="Taux d'occupation" value={85} max={100} min={0} size="normal" style="light" />
                    </div>
                </div>

                <div class="flex flex-col md:flex-row-reverse items-center gap-10">
                    <div class="flex flex-col gap-3 flex-1">
                        <Badge color="primary">Contrats</Badge>
                        <Heading components="h3" size="large" fontClasses="bold">
                            Gérez vos contrats de location
                        </Heading>
                        <Text size="base" class="text-muted-text leading-relaxed">
                            Créez, suivez et archivez vos contrats. Recevez des alertes avant chaque échéance pour ne jamais laisser un contrat expirer sans action.
                        </Text>
                    </div>
                    <div class="flex flex-col gap-3 flex-1">
                        <CardTicket title="Contrats actifs" value="8" urgent="1" />
                        <CardProgressionBar title="Contrats signés cette année" value={8} max={10} min={0} size="normal" style="light" />
                    </div>
                </div>

                <div class="flex flex-col md:flex-row items-center gap-10">
                    <div class="flex flex-col gap-3 flex-1">
                        <Badge color="warning">Biens & Locataires</Badge>
                        <Heading components="h3" size="large" fontClasses="bold">
                            Un portefeuille immobilier maîtrisé
                        </Heading>
                        <Text size="base" class="text-muted-text leading-relaxed">
                            Gérez vos biens, vos locataires et vos prestataires depuis un seul tableau de bord. Plus de fichiers éparpillés, tout est centralisé.
                        </Text>
                    </div>
                    <div class="flex flex-col gap-3 flex-1">
                        <CardTicket title="Biens gérés" value="12" urgent="0" />
                        <CardRevenue title="Valeur du portefeuille" stat={480000} />
                    </div>
                </div>

            </section>

            <section class="bg-background-primary px-8 py-20 flex flex-col items-center text-center gap-6">
                <Heading components="h2" size="extra-large" color="white" fontClasses="extra-bold">
                    Prêt à simplifier votre gestion ?
                </Heading>
                <Text size="base" class="text-muted-text max-w-md leading-relaxed">
                    Rejoignez Proprieto et reprenez le contrôle de votre patrimoine immobilier dès aujourd'hui.
                </Text>
                <a href="/auth/login">
                    <Button type="button" color="blue">Commencer maintenant</Button>
                </a>
            </section>

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

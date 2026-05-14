import { Hr, Link, Section } from "react-email";
import { EmailButton } from "./components/EmailButton";
import { EmailHeading } from "./components/EmailHeading";
import { EmailInfoBox } from "./components/EmailInfoBox";
import { EmailLayout } from "./components/EmailLayout";
import { EmailText } from "./components/EmailText";

interface NewUserProps {
    loginUrl: string;
}

export function NewUser({ loginUrl }: NewUserProps) {
    return (
        <EmailLayout preview="Bienvenue sur Proprieto - Votre compte a été créé">
            <EmailHeading component="h2">Bienvenue sur Proprieto</EmailHeading>

            <EmailText>
                Votre compte a bien été créé. Vous pouvez dès maintenant accéder à votre
                espace et commencer à gérer vos biens immobiliers.
            </EmailText>

            <Section style={{ textAlign: "center", margin: "0 0 24px" }}>
                <EmailButton href={loginUrl} color="green">
                    Accéder à mon compte
                </EmailButton>
            </Section>

            <EmailInfoBox variant="success">
                Votre compte est actif. Connectez-vous pour découvrir toutes les
                fonctionnalités de Proprieto.
            </EmailInfoBox>

            <Hr
                style={{
                    borderColor: "#e5e6ed",
                    margin: "24px 0",
                }}
            />

            <EmailText>
                Si vous n'êtes pas à l'origine de la création de ce compte, contactez-nous
                immédiatement à{" "}
                <Link
                    href="mailto:noreply@quentin-derimais.fr"
                    style={{ color: "#2d7adb", textDecoration: "none" }}
                >
                    noreply@quentin-derimais.fr
                </Link>
                .
            </EmailText>
        </EmailLayout>
    );
}

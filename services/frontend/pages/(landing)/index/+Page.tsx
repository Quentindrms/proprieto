import { Badge } from "@components/badge";
import { ActionButton, Button } from "@components/button";
import {
    CardProgressionBar,
    CardRevenue,
    CardTicket,
} from "@components/dataCard";
import { Form, Select, TextField, ToggleSwitch } from "@components/form";
import TransactionRow from "@components/rows";
import Heading from "../../../components/heading";

export default function Page() {
    return (
        <div class="h-full w-full flex flex-col gap-2 p-5">
            <CardRevenue
                title="Le chiffre du jour"
                stat={1000}
                comment="Prout le monde"
                dynamic={true}
            />

            <CardProgressionBar
                value={50}
                max={100}
                min={0}
                title="Barre de progression"
            />

            <CardTicket title="Demandes ouvertes" urgent="0" value="0" />

            <div class="flex gap-3">
                <Badge color="error">Erreur</Badge>
                <Badge color="success">Succès</Badge>
                <Badge color="primary">Primaire</Badge>
                <Badge color="warning">Warning</Badge>
            </div>

            <div class="flex gap-3">
                <ActionButton color="black">Black</ActionButton>
                <ActionButton color="gray">Gray</ActionButton>
                <ActionButton color="outline">Outline</ActionButton>
            </div>

            <div class="flex gap-3">
                <Button type="button" color="blue">
                    Bleu
                </Button>
                <Button type="button" color="red">
                    Rouge
                </Button>
                <Button type="button" color="green">
                    Vert
                </Button>
            </div>

            <Form callback={() => { }}>
                <TextField label="Champ de texte"></TextField>
                <TextField label="Email" type="email"></TextField>
                <Select
                    label="Sélecteur"
                    labelOptions="Sélectionner une sélection"
                    options={[{ label: "Test", value: "test", disabled: false }]}
                />
                <ToggleSwitch label="Prout le monde !" />
            </Form>

            <div>
                <TransactionRow
                    income={true}
                    name="Revenu"
                    recipient="Jean-Michel Dupont"
                    amount="1000"
                />
            </div>
        </div>
    );
}

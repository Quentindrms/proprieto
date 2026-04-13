import type { Client } from "@app/types/client";
import type { Property } from "@app/types/property";
import type { ProviderType } from "@app/types/provider";
import { Badge } from "@components/badge";
import { ActionButton, Button } from "@components/button";
import { ClientCard, ClientList } from "@components/clientCard";
import {
    CardProgressionBar,
    CardRevenue,
    CardTicket,
} from "@components/dataCard";
import { Form, Select, TextField, ToggleSwitch } from "@components/form";
import PropertyCard from "@components/propertyCard";
import ProviderCard from "@components/providerCard";
import TransactionRow from "@components/rows";
import Heading from "../../../components/heading";

export default function Page() {
    const client: Client = {
        name: "Dupont",
        firstName: "Pierre",
        address: "L'adresse de Pierre Dupont",
        email: "pierredupont@email.fr",
        phone: "0677134034",
        id: "123",
        clients: [],
    };

    const provider: ProviderType = {
        id: "123",
        directories: {
            name: "Dupont",
            firstName: "Pierre",
            address: "L'adresse de Pierre Dupont",
            email: "pierredupont@email.fr",
            phone: "0677134034",
            userId: "123",
        },
    };

    const property: Property = {
        id: "",
        isActive: true,
        isDeleted: false,
        name: "Ma belle maison",
        propertyType: {
            id: "",
            name: "",
            slug: "",
        },
        userId: "",
        purchaseDate: new Date(),
        purchasePrice: "100000",
        sellDate: undefined,
        sellPrice: undefined,
    };
    return (
        <div class="h-full w-full flex flex-col gap-2 p-5">
            <CardRevenue
                title="Le chiffre du jour"
                stat={1000}
                comment="Prout le monde"
                dynamic={true}
            />

            <CardProgressionBar
                value={35}
                max={100}
                min={0}
                title="Barre de progression"
                size="normal"
                style="light"
            />

            <CardTicket title="Demandes ouvertes" urgent="0" value="0" />

            <div class="flex gap-3">
                <Badge color="error" >Erreur</Badge>
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
                    type={"income"}
                    name="Revenu"
                    amount={1000}
                    isPaid={true}
                />
                <TransactionRow
                    type={"outcome"}
                    name="Dépense"
                    amount={1000}
                    isPaid={false}
                />
            </div>

            <div class="flex flex-row">
                <div class="flex flex-col">
                    <ClientList client={client} />
                    <ClientList client={client} />
                </div>

                <ClientCard client={client} />
            </div>

            <div>
                <PropertyCard property={property} />
            </div>
        </div>
    );
}

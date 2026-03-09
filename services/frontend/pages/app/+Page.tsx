import { Badge } from "../../components/badge";
import Board, { ContractBoardLine } from "../../components/board";
import { Button } from "../../components/button";
import { BasicCard, LargeCard, StatCard } from "../../components/cards";
import ClientCard from "../../components/clientCard";
import Heading from "../../components/heading";
import ProgressBar from "../../components/progressBar";
import PropertyCard from "../../components/propertyCard";
import SearchField from "../../components/searchField";
import Text from "../../components/text";
import type { Client } from "../../types/client";
import type { Property } from "../../types/property";

export default function Page() {

    const property: Property = {
        name: "Ma propriété",
        purshacePrice: "100 000",
        purshaceDate: new Date(),
        sellPrice: "0",
        sellDate: new Date(),
        isDeleted: false,
        isActive: true,
        type: "Appartement",
    };

    const client: Client = {
        name: "Nom",
        surname: "Prénom",
        email: "email@démonstration.fr",
        adress: "13 rue des couilles qui collent",
        phone: "06 77 13 40 34",
    }

    const column = ["Colonne", "Colonne", "Colonne", "Colonne", "Colonne"]

    function handleEdit() {
        console.log("Edit")
    }

    function handleDelete() {
        console.log("Delete");
    }

    return (
        <div class="flex flex-col gap-1 bg-background-base">

            <Heading components="h1" size="extra-large">
                Bienvenue dans l'application
            </Heading>

            <Text components="p" bold>Mon texte</Text>

            <StatCard title="Test" legend="Au cours du mois" value="10" accentColor="red"></StatCard>
            <BasicCard title="Carte basique" stat="5" />
            <LargeCard title="Carte large"></LargeCard>

            <div class="grid grid-cols-2 gap-2">
                <Button type="button" color="green">Bouton de test</Button>
                <Button type="button" color="red">Bouton de test</Button>
                <Button type="button" color="blue">Bouton de test</Button>
                <Button type="button" color="gold">Bouton de test</Button>
            </div>

            <div class="grid grid-cols-2">
                <Badge color="green">Il est beau le badge</Badge>
                <Badge color="red">Il est beau le badge</Badge>
                <Badge color="blue">Il est beau le badge</Badge>
                <Badge color="gold">Il est beau le badge</Badge>
            </div>
            <div>
                <SearchField
                    name="search"
                    placeholder="Fais une recherche pour voir "
                    onInput={() => console.log('prout')}
                />
            </div>
            <div>
                <PropertyCard
                    property={property}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <ClientCard
                    client={client}
                />

                <ProgressBar label="Barre de progression" value={75} />

                <Board name="Mon tableau" columns={column}>
                    <ContractBoardLine
                        cells={["Cellule", "Celulle"]}
                        status={{ label: "string", color: "green" }}></ContractBoardLine>
                </Board>
            </div>
        </div>)
}

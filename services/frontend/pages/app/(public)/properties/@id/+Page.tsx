import type { PropertyFluxBoardItem } from "@app/types/board";
import { Board } from "@components/board";
import { ButtonGroup } from "@components/button";
import {
    CardInfo,
    CardProgressionBar,
    CurrentContractCard,
} from "@components/dataCard";
import PageNamer from "@components/pageNamer";
import PropertyResume from "@components/propertyResume";
import { PropertyFluxRow } from "@components/rows";
import Text from "@components/text";
import { PropertyFluxBoardTitle } from "@libs/boardTitle";
import { createSignal, Show } from "solid-js";

export default function PropertyDetails() {
    const [selectedBoard, setSelectedBoard] = createSignal<
        "outcome" | "income" | "client"
    >("outcome");

    const buttonGroup = [
        {
            label: "Dépense",
            value: "outcome",
            onClick: () => setSelectedBoard("outcome"),
        },
        {
            label: "Revenu",
            value: "income",
            onClick: () => setSelectedBoard("income"),
        },
        {
            label: "Locataire",
            value: "client",
            onClick: () => setSelectedBoard("client"),
        },
    ];

    const fakeData: PropertyFluxBoardItem[] = [{
        date: new Date(),
        isPaid: true,
        name: "Test",
        amount: 100,
    },
    {
        date: new Date(),
        isPaid: true,
        name: "Test",
        amount: 100,
    },
    {
        date: new Date(),
        isPaid: true,
        name: "Test",
        amount: 100,
    }, {
        date: new Date(),
        isPaid: true,
        name: "Test",
        amount: 100,
    }]

    return (
        <div class="w-full h-full flex-col gap-10">
            <PageNamer
                onClick={() => { }}
                pageName="Détail de <nom de votre propriété>"
                subText="Consulter les détails de votre propriété"
            />

            <div class="flex flex-wrap gap-2 pb-4">
                <CurrentContractCard client="Jean Dupont" endDate={new Date()} />

                <CardProgressionBar
                    size="normal"
                    style="light"
                    title="Rentabilité locative"
                    value={50}
                    max={100}
                    min={0}
                />

                <CardInfo stat={5000} title="Dépense totale" />
            </div>

            <div class="flex flex-col gap-2">
                <ButtonGroup options={buttonGroup} defaultValue="outcome" />
                <div class="flex flex-col-reverse md:flex-row gap-10 justify-start">
                    <Show when={selectedBoard() === "outcome"}>
                        <Board
                            header={{ title: PropertyFluxBoardTitle }}
                            body={{
                                data: fakeData,
                                renderRow: (item: PropertyFluxBoardItem) => (
                                    <PropertyFluxRow {...item} />
                                ),
                            }}
                            size="xl"
                        />
                    </Show>

                    <Show when={selectedBoard() === "income"}>
                        <Board
                            header={{ title: PropertyFluxBoardTitle }}
                            body={{
                                data: fakeData,
                                renderRow: (item: PropertyFluxBoardItem) => (
                                    <PropertyFluxRow {...item} />
                                ),
                            }}
                            size="xl"
                        />
                    </Show>

                    <PropertyResume
                        name="Test"
                        purchaseDate={new Date()}
                        purchasePrice={100}
                        surfaceArea={70}
                        totalLoans={10}
                    />
                </div>
            </div>
        </div>
    );
}

import type { PropertyClientItem, PropertyFluxBoardItem } from "@app/types/board";
import { Board } from "@components/board";
import { ButtonGroup } from "@components/button";
import {
    CardInfo,
    CardProgressionBar,
    CurrentContractCard,
} from "@components/dataCard";
import PageNamer from "@components/pageNamer";
import PropertyResume from "@components/propertyResume";
import { PropertyClientRow, PropertyFluxRow } from "@components/rows";
import { PropertyClientBoardTitle, PropertyFluxBoardTitle } from "@libs/boardTitle";
import { createSignal, Show } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";

export default function PropertyDetails() {
    const data = useData<Data>();

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

    const fakeData: PropertyFluxBoardItem[] = [
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
        },
    ];

    const incomes: PropertyFluxBoardItem[] = data.income.map((income) => ({ name: income.name, date: new Date(income.issueDate), isPaid: income.isPaid, amount: income.amount }));

    return (
        <div class="w-full h-full flex-col gap-10">
            <PageNamer
                onClick={() => { }}
                pageName={`Détail de ${data.property.name}`}
                subText="Consulter les détails de votre propriété"
            />

            <div class="flex flex-wrap gap-2 pb-4">
                <CurrentContractCard client={`${data.contract.client.directory.firstName} ${data.contract.client.directory.name}`} endDate={new Date()} />

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
                                data: incomes,
                                renderRow: (item: PropertyFluxBoardItem) => (
                                    <PropertyFluxRow {...item} />
                                ),
                            }}
                            size="2xl"
                        />
                    </Show>

                    <Show when={selectedBoard() === "income"}>
                        <Board
                            header={{ title: PropertyFluxBoardTitle }}
                            body={{
                                data: incomes,
                                renderRow: (item: PropertyFluxBoardItem) => (
                                    <PropertyFluxRow {...item} />
                                ),
                            }}
                            size="2xl"
                        />
                    </Show>

                    <Show when={selectedBoard() === "client"}>
                        <Board
                            header={{ title: PropertyClientBoardTitle }}
                            body={{ data: [], renderRow: (item: PropertyClientItem) => <PropertyClientRow {...item} /> }}
                            size="2xl"
                        />
                    </Show>

                    <PropertyResume
                        name={data.property.name}
                        purchaseDate={data.property.purchaseDate?.toString()}
                        purchasePrice={data.property.purchasePrice}
                        surfaceArea={0}
                        totalLoans={0}
                    />
                </div>
            </div>
        </div>
    );
}

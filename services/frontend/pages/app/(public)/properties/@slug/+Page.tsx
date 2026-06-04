import type {
    PropertyClientItem,
    PropertyFluxBoardItem,
} from "@app/types/board";
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
import {
    PropertyClientBoardTitle,
    PropertyFluxBoardTitle,
} from "@libs/boardTitle";
import { isAfter, isBefore } from "date-fns";
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

    const incomes: PropertyFluxBoardItem[] = data.income.map((income) => ({
        name: income.name,
        date: new Date(income.issueDate),
        isPaid: income.isPaid,
        amount: income.amount,
    }));

    const outcomes: PropertyFluxBoardItem[] = data.outcome.map((outcome) => ({
        name: outcome.name,
        date: new Date(outcome.issueDate),
        isPaid: outcome.isPaid,
        amount: outcome.amount,
    }))

    const contractsList: PropertyClientItem[] = data.contract.map((contract) => ({
        name: `${contract.client.directory.firstName} ${contract.client.directory.name}`,
        startDate: contract.startDate,
        endDate: contract.endDate,
        totalAmount: contract.client.directory.totalIncome,
    }));

    const propertyTotalIncome = contractsList.reduce((sum, income) => sum + income.totalAmount, 0);
    const propertyTotalOutcome = outcomes.reduce((sum, outcome) => sum + outcome.amount, 0);

    const currentContract = contractsList.find((contract) => {
        const now = new Date();
        const before = isBefore(new Date(contract.startDate), now);
        const after = isAfter(new Date(contract.endDate), now);
        if (before && after) {
            return contract;
        }
        return undefined;
    });

    function recoveryRate(purchasePrice: number, totalOutcome: number, totalIncome: number) {
        const netIncome = totalOutcome - totalIncome;
        return ((netIncome / purchasePrice) * 100);
    }

    return (
        <div class="w-full h-full flex-col gap-10">
            <PageNamer
                onClick={() => { }}
                pageName={`Détail de ${data.property.name}`}
                subText="Consulter les détails de votre propriété"
            />

            <div class="flex flex-wrap gap-2 pb-4">
                <CurrentContractCard
                    client={currentContract ? currentContract.name : ""}
                    endDate={currentContract?.endDate}
                />

                <CardProgressionBar
                    size="normal"
                    style="light"
                    title="Rentabilité locative"
                    value={recoveryRate(data.property.purchasePrice, propertyTotalOutcome, propertyTotalIncome)}
                    max={100}
                    min={0}

                />

                <CardInfo stat={propertyTotalOutcome} title="Dépense totale" />
            </div>

            <div class="flex flex-col gap-2">
                <ButtonGroup options={buttonGroup} defaultValue="outcome" />
                <div class="flex flex-col-reverse md:flex-row gap-10 justify-start">
                    <Show when={selectedBoard() === "outcome"}>
                        <Board
                            header={{ title: PropertyFluxBoardTitle }}
                            body={{
                                data: outcomes,
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
                            body={{
                                data: contractsList,
                                renderRow: (item: PropertyClientItem) => (
                                    <PropertyClientRow {...item} />
                                ),
                            }}
                            size="2xl"
                        />
                    </Show>

                    <PropertyResume
                        name={data.property.name}
                        purchaseDate={data.property.purchaseDate?.toString()}
                        purchasePrice={data.property.purchasePrice}
                        surfaceArea={0}
                        totalLoans={propertyTotalIncome}
                    />
                </div>
            </div>
        </div>
    );
}

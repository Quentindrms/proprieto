import { useFinance } from "@hooks/useFinance";
import {
    onCreateIncome,
    onCreateOutcome,
    onDeleteFlux,
    onEditIncome,
    onEditOutcome,
} from "@hooks/useFinance.telefunc";
import { o } from "node_modules/vitest/dist/chunks/reporters.d.BwkR0iL5";
import { describe, expect, it, vi } from "vitest";

vi.mock("vike/client/router", () => ({
    navigate: vi.fn(),
    reload: vi.fn(),
}));

vi.mock("solid-toast", () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));


vi.mock("@hooks/useFinance.telefunc", () => ({
    onCreateIncome: vi.fn().mockResolvedValue({ message: "success" }),
    onCreateOutcome: vi.fn().mockResolvedValue({ message: "success" }),
    onDeleteFlux: vi.fn().mockResolvedValue({ message: "success" }),
    onEditIncome: vi.fn().mockResolvedValue({ message: "success" }),
    onEditOutcome: vi.fn().mockResolvedValue({ message: "success" }),
}));

const fakeEvent = (value: string) =>
    ({ target: { value } }) as unknown as InputEvent;

const fakeCheckboxEvent = (checked: boolean) =>
    ({ target: { type: "checkbox", checked } }) as unknown as InputEvent;

describe("UseFinance - Créer une dépense", () => {
    it("Doit setter formError et ne pas appeler onCreate si les données sont invalides", async () => {
        const finance = useFinance();

        await finance.handleCreateOutcome();
        expect(finance.outcomeErrors()).toBeDefined();
        expect(finance.outcomeErrors()?.success).toBe(false);
        expect(onCreateOutcome).not.toHaveBeenCalled();
    })

    it("Ne doit pas setter formError et doit appeler onCreate si les données sont valides", async () => {
        const finance = useFinance();

        finance.handleInputOutcome("amount")(fakeEvent("100"))
        finance.handleInputOutcome("categoryId")(fakeEvent(crypto.randomUUID()))
        finance.handleInputOutcome("frequency")(fakeEvent("none"))
        finance.handleInputOutcome("isPaid")(fakeCheckboxEvent(false))
        finance.handleInputOutcome("isRecurring")(fakeCheckboxEvent(false))
        finance.handleInputOutcome("issueDate")(fakeEvent(new Date().toISOString()))
        finance.handleInputOutcome("name")(fakeEvent("Test Finance"))
        finance.handleInputOutcome("paidOn")(fakeEvent(new Date().toISOString()))
        finance.handleInputOutcome("propertyId")(fakeEvent(crypto.randomUUID()))
        finance.handleInputOutcome("providerId")(fakeEvent(crypto.randomUUID()))



        await finance.handleCreateOutcome();
        expect(finance.outcomeErrors()).not.toBeDefined();
        expect(onCreateOutcome).toHaveBeenCalled();
    })
})

describe("UseFinnance - Modifier une dépense", () => {
    it("Doit setter formError et ne pas appeler onEdit si les données sont invalides", async () => {
        const finance = useFinance();

        await finance.handleEditOutcome();
        expect(finance.outcomeErrors()).toBeDefined();
        expect(finance.outcomeErrors()?.success).toBe(false)
    })

    it("Ne doit pas setter formError et appeler onEdit si les données sont valides", async () => {
        const finance = useFinance();

        finance.handleUpdateOutcome("amount")(fakeEvent("100"))
        finance.handleUpdateOutcome("categoryId")(fakeEvent(crypto.randomUUID()))
        finance.handleUpdateOutcome("frequency")(fakeEvent("none"))
        finance.handleUpdateOutcome("isPaid")(fakeCheckboxEvent(false))
        finance.handleUpdateOutcome("isRecurring")(fakeCheckboxEvent(false))
        finance.handleUpdateOutcome("issueDate")(fakeEvent(new Date().toISOString()))
        finance.handleUpdateOutcome("name")(fakeEvent("Test Finance"))
        finance.handleUpdateOutcome("paidOn")(fakeEvent(new Date().toISOString()))
        finance.handleUpdateOutcome("propertyId")(fakeEvent(crypto.randomUUID()))
        finance.handleUpdateOutcome("providerId")(fakeEvent(crypto.randomUUID()))
        finance.handleUpdateOutcome("id")(fakeEvent(crypto.randomUUID()))

        await finance.handleEditOutcome();
        expect(finance.outcomeErrors()).not.toBeDefined();
        expect(onEditOutcome).toHaveBeenCalled();
    })
})

describe("UseFinnance - Créer un revenu", () => {
    it("Doit setter formError et ne pas appeler onCreate si les données sont valides", async () => {
        const finance = useFinance();

        await finance.handleCreateIncome();
        expect(finance.incomeErrors()).toBeDefined();
        expect(finance.incomeErrors()?.success).toBe(false);
        expect(onCreateIncome).not.toHaveBeenCalled();
    })

    it("Ne doit pas setter formError et doit appeler onCreate si les données sont valides", async () => {
        const finance = useFinance();

        finance.handleInputIncome("amount")(fakeEvent("100"))
        finance.handleInputIncome("categoryId")(fakeEvent(crypto.randomUUID()))
        finance.handleInputIncome("frequency")(fakeEvent("none"))
        finance.handleInputIncome("isPaid")(fakeCheckboxEvent(false))
        finance.handleInputIncome("isRecurring")(fakeCheckboxEvent(false))
        finance.handleInputIncome("issueDate")(fakeEvent(new Date().toISOString()))
        finance.handleInputIncome("name")(fakeEvent("Test Finance"))
        finance.handleInputIncome("paidOn")(fakeEvent(new Date().toISOString()))
        finance.handleInputIncome("contractId")(fakeEvent(crypto.randomUUID()))

        await finance.handleCreateIncome();
        expect(finance.incomeErrors()).not.toBeDefined();
        expect(onCreateIncome).toHaveBeenCalled()
    })
})

describe("UseFinnance - Modifier un revenu", () => {
    it("Doit setter formError et ne pas appeler onUpdate si les données sont invalides", async () => {
        const finance = useFinance();

        await finance.handleEditIncome()
        expect(finance.incomeErrors()).toBeDefined();
        expect(finance.incomeErrors()?.success).toBe(false);
    })

    it("Ne soit pas setter formError et appeler onUpdate si les données sont valides", async () => {
        const finance = useFinance();

        finance.handleUpdateIncome("amount")(fakeEvent("100"))
        finance.handleUpdateIncome("categoryId")(fakeEvent(crypto.randomUUID()))
        finance.handleUpdateIncome("frequency")(fakeEvent("none"))
        finance.handleUpdateIncome("isPaid")(fakeCheckboxEvent(false))
        finance.handleUpdateIncome("isRecurring")(fakeCheckboxEvent(false))
        finance.handleUpdateIncome("issueDate")(fakeEvent(new Date().toISOString()))
        finance.handleUpdateIncome("name")(fakeEvent("Test Finance"))
        finance.handleUpdateIncome("paidOn")(fakeEvent(new Date().toISOString()))
        finance.handleUpdateIncome("contractId")(fakeEvent(crypto.randomUUID()))
        finance.handleUpdateIncome("id")(fakeEvent(crypto.randomUUID()))

        await finance.handleEditIncome();
        expect(finance.incomeErrors()).not.toBeDefined();
        expect(onEditIncome).toHaveBeenCalled();
    })
})
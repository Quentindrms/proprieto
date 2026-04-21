import { useContract } from "@hooks/useContract";
import { onCreate } from "@hooks/useContract.telefunc";
import { describe, expect, it, vi } from "vitest";

vi.mock("vike/client/router", () => ({
    navigate: vi.fn(),
}));

vi.mock("solid-toast", () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@hooks/useAuth.telefunc", () => ({
    onLogin: vi.fn(),
    onRegister: vi.fn(),
}));

vi.mock("@hooks/useContract.telefunc", () => ({
    onCreate: vi.fn(),
}));

const fakeEvent = (value: string) =>
    ({ target: { value } }) as unknown as InputEvent;

describe("UseContract - Création", () => {
    it("Doit setter formError et ne pas appeler onCreate si les données sont invalides", async () => {
        const contract = useContract();
        await contract.create();
        expect(contract.formError()).toBeDefined();
        expect(contract.formError()?.success).toBe(false);
    });

    it("Ne doit pas setter formError et appeler onCreate si les donnérs sont valides", async () => {
        const contract = useContract();

        contract.handleCreateInput("clientId")(fakeEvent(crypto.randomUUID()));
        contract.handleCreateInput("endDate")(fakeEvent(new Date().toISOString()));
        contract.handleCreateInput("lease")(fakeEvent("10"));
        contract.handleCreateInput("propertyId")(fakeEvent(crypto.randomUUID()));
        contract.handleCreateInput("startDate")(
            fakeEvent(new Date().toISOString()),
        );

        await contract.create();
        expect(contract.formError()).not.toBeDefined();
        expect(onCreate).toHaveBeenCalled();
    });
});

describe("Usecontract - Édition", () => {
    it("Doit setter formError et ne pas appeler onEdit si les données sont invalides", async () => {
        const contract = useContract();

        /** TODOD : implements contracts edition */
    })
})

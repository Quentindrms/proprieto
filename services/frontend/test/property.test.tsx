import { useProperty } from "@hooks/useProperty";
import { onCreate, onDelete, onUpdate } from "@hooks/useProperty.telefunc";
import { reload } from "vike/client/router";
import { describe, expect, it, vi } from "vitest";

vi.mock("vike/client/router", () => ({
    reload: vi.fn(),
}));

vi.mock("solid-toast", () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@hooks/useProperty.telefunc", () => ({
    onCreate: vi.fn(),
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
}));

const fakeEvent = (value: string) =>
    ({ target: { value } }) as unknown as InputEvent;

describe("UseProperty - Création", () => {
    it("Doit setter formError et ne doit pas appeler onCreate si les données sont invalides", async () => {
        const property = useProperty();

        await property.create();
        expect(property.formError()).toBeDefined();
        expect(property.formError()?.success).toBe(false);
        expect(onCreate).not.toHaveBeenCalled();
    });

    it("Ne doit pas setter formError et doit appeler onCreate si les données sont valides", async () => {
        const property = useProperty();

        property.handleCreateInput("name")(fakeEvent("Villa en Espagne"));
        property.handleCreateInput("purchasePrice")(fakeEvent("1000"));
        property.handleCreateInput("purchaseDate")(fakeEvent(new Date().toISOString()))
        property.handleCreateInput("sellDate")(fakeEvent(new Date().toISOString()))
        property.handleCreateInput("sellPrice")(fakeEvent("0"))
        property.handleCreateInput("type")(fakeEvent(crypto.randomUUID()))

        await property.create();
        expect(property.formError()).not.toBeDefined();
        expect(onCreate).toHaveBeenCalled();
    })
})
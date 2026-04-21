import { useClient } from "@hooks/useClient";
import { onCreate, onDelete, onEdit } from "@hooks/useClient.telefunc";
import { reload } from "vike/client/router";
import { describe, expect, it, vi } from "vitest";

vi.mock("vike/client/router", () => ({
    reload: vi.fn(),
}));

vi.mock("solid-toast", () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@hooks/useClient.telefunc", () => ({
    onCreate: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
}));

const fakeEvent = (value: string) =>
    ({ target: { value } }) as unknown as InputEvent;

describe("UseClient - Création", () => {
    it("Doit setter formError et ne pas appeler onCreate si les données sont invalides", async () => {
        const { create, formError } = useClient();
        await create();
        expect(onCreate).not.toHaveBeenCalled();
        expect(formError).toBeDefined();
        expect(formError()?.success).toBe(false);
    });

    it("Ne doit pas seter formError et appeler onCreate si les données sont valides", async () => {
        const client = useClient();

        client.handleCreate("name")(fakeEvent("Dupont"));
        client.handleCreate("firstName")(fakeEvent("Pierre"));
        client.handleCreate("email")(fakeEvent("pierre.dupont@mail.fr"));
        client.handleCreate("address")(fakeEvent("10 rue de la Paix, 75016 Paris"));
        client.handleCreate("phone")(fakeEvent("0740234012"));

        await client.create();
        expect(onCreate).toHaveBeenCalled();
        expect(client.formError()).not.toBeDefined();
        expect(reload).toHaveBeenCalled();
    });
});

describe("UseClient - Modification", () => {
    it("Doit setter formError et ne pas appeler onEdit si les données sont invalides", async () => {
        const client = useClient();

        await client.update();
        expect(client.formError()).toBeDefined();
        expect(client.formError()?.success).toBe(false);
        expect(onEdit).not.toHaveBeenCalled();
    });

    it("Ne soit pas setter formError et appeler onEdit si les données sont valides", async () => {
        const client = useClient();

        client.handleUpdateClient("name")(fakeEvent("Dupont de Ligonnès"));
        client.handleUpdateClient("firstName")(fakeEvent("Xavier"));
        client.handleUpdateClient("email")(fakeEvent("xavier.dupont@mail.fr"));
        client.handleUpdateClient("address")(
            fakeEvent("10 rue de la Paix, 75016 Paris"),
        );
        client.handleUpdateClient("phone")(fakeEvent("0740234012"));
        client.handleUpdateClient("id")(fakeEvent(crypto.randomUUID()));

        await client.update();
        expect(client.formError()).not.toBeDefined();
        expect(onEdit).toHaveBeenCalled();
    });
});

describe("UseClient - Suppression", () => {
    it("Doit appeler onDelete et reload", async () => {
        const client = useClient();

        await client.remove();
        expect(onDelete).toHaveBeenCalled();
        expect(reload).toHaveBeenCalled();
    });
});

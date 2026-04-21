import { useProvider } from "@hooks/useProvider";
import { onEdit } from "@hooks/useClient.telefunc";
import { onCreate } from "@hooks/useProvider.telefunc";
import { describe, expect, it, vi } from "vitest";

vi.mock("vike/client/router", () => ({
    reload: vi.fn(),
}));

vi.mock("solid-toast", () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@hooks/useProvider.telefunc", () => ({
    onCreate: vi.fn(),
    onRemove: vi.fn(),
}));

vi.mock("@hooks/useClient.telefunc", () => ({
    onEdit: vi.fn(),
}));

const fakeEvent = (value: string) =>
    ({ target: { value } }) as unknown as InputEvent;

describe("UseProvider - Création", () => {
    it("Doit setter formError et ne doit pas appeler onCreate si les données sont invalides", async () => {
        const provider = useProvider();

        await provider.create();
        expect(provider.formError()).toBeDefined();
        expect(provider.formError()?.success).toBe(false);
        expect(onCreate).not.toHaveBeenCalled();
    });

    it("Ne doit pas setter formError et doit appeler onCreate si les données sont valides", async () => {
        const provider = useProvider();

        provider.handleCreateInput("name")(fakeEvent("Smith"));
        provider.handleCreateInput("firstName")(fakeEvent("Johny"));
        provider.handleCreateInput("email")(fakeEvent("johny.smith@mail.fr"));
        provider.handleCreateInput("address")(
            fakeEvent("10 Rue de la Paix, 75016 Paris"),
        );
        provider.handleCreateInput("phone")(fakeEvent("0780903456"));

        await provider.create();
        expect(provider.formError()).not.toBeDefined();
        expect(onCreate).toHaveBeenCalled();
    });
});

describe("UseProvider - Édition", () => {
    it("Doit setter formError et ne doit pas appeler onEdit si les donnérs son invalides", async () => {
        const provider = useProvider();
        await provider.edit();
        expect(provider.formError()).toBeDefined();
        expect(provider.formError()?.success).toBe(false);
    })

    it("Ne doit pas setter formError et doit appeler onEdit si les données sont valides", async () => {
        const provider = useProvider();

        provider.handleUpdateInput("name")(fakeEvent("Smith"));
        provider.handleUpdateInput("firstName")(fakeEvent("Johny"));
        provider.handleUpdateInput("email")(fakeEvent("johny.smith@mail.fr"));
        provider.handleUpdateInput("address")(
            fakeEvent("10 Rue de la Paix, 75016 Paris"),
        );
        provider.handleUpdateInput("phone")(fakeEvent("0780903456"));

        await provider.edit();
        expect(provider.formError()).not.toBeDefined();
        expect(onEdit).toHaveBeenCalled();
    })
})

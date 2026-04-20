import { useAuth } from "@hooks/useAuth";
import { onLogin, onRegister } from "@hooks/useAuth.telefunc";
import { navigate } from "vike/client/router";
import { createRoot } from "solid-js";
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

describe("useAuth - handleRegister", () => {
    it("setter formError et ne pas appeler onRegister si les données sont invalides", async () => {
        await createRoot(async (dispose) => {
            const { handleRegister, formError } = useAuth();
            await handleRegister();
            expect(formError()).toBeDefined();
            expect(onRegister).not.toHaveBeenCalled();
            dispose();
        });
    });

    it("appeler onRegister si les données sont valides", async () => {
        vi.mocked(onRegister).mockResolvedValue({ success: true });

        await createRoot(async (dispose) => {
            const auth = useAuth();
            const fakeEvent = (value: string) =>
                ({ target: { value } }) as unknown as InputEvent;

            auth.handleRegisterInputChange("name")(fakeEvent("Dupont"));
            auth.handleRegisterInputChange("firstName")(fakeEvent("Jean-Pierre"));
            auth.handleRegisterInputChange("email")(fakeEvent("jean.dupont@example.com"));
            auth.handleRegisterInputChange("address")(fakeEvent("12 rue de la Paix, Paris 75001"));
            auth.handleRegisterInputChange("phone")(fakeEvent("0612345678"));
            auth.handleRegisterInputChange("password")(fakeEvent("MotDePasseSecure123!"));
            auth.handleRegisterInputChange("passwordValidation")(fakeEvent("MotDePasseSecure123!"));

            await auth.handleRegister();
            expect(auth.formError()).toBeUndefined();
            expect(onRegister).toHaveBeenCalled();
            dispose();
        });
    });
});

describe("useAuth - handleLogin", () => {
    it("appeler navigate('/app/') si onLogin retourne success", async () => {
        vi.mocked(onLogin).mockResolvedValue({ success: true });

        await createRoot(async (dispose) => {
            const auth = useAuth();
            const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
            auth.setEmail("test@example.com");
            auth.setPassword("monmotdepasse");
            await auth.handleLogin(event);
            expect(navigate).toHaveBeenCalledWith("/app/");
            dispose();
        });
    });

    it("ne pas naviguer si onLogin retourne success: false", async () => {
        vi.mocked(onLogin).mockResolvedValue({ success: false });
        vi.mocked(navigate).mockClear();

        await createRoot(async (dispose) => {
            const auth = useAuth();
            const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
            await auth.handleLogin(event);
            expect(navigate).not.toHaveBeenCalledWith("/app/");
            dispose();
        });
    });
});

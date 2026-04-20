import type { UserCreation } from "@app/types/user";
import { CreateUserSchema } from "@schemas/auth";
import { describe, expect, it } from "vitest";
import { email } from "zod";

const validData: UserCreation = {
    name: "Smith",
    firstName: "John",
    email: "john.smith@mail.com",
    address: "10 rue de la Paix, 75016 Paris",
    phone: "0650123045",
    password: "motdepasse123!",
    passwordValidation: "motdepasse123!",
};

describe("Schema utilisateur", () => {
    it("Accepte les données valides", () => {
        const result = CreateUserSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it("Rejette un email invalide", () => {
        const result = CreateUserSchema.safeParse({
            ...validData,
            email: "invalid@email",
        });
        expect(result.success).toBe(false);
    });

    it("Rejette des mots de passe qui ne correspondent pas", () => {
        const result = CreateUserSchema.safeParse({
            ...validData,
            passwordValidation: "test123"
        })
        expect(result.success).toBe(false);
    })

    it("Rejette un mot de passe trop court", () => {
        const result = CreateUserSchema.safeParse({
            ...validData,
            password: "trop-court",
            passwordValidation: "trop-court",
        })
        expect(result.success).toBe(false);
    })
});

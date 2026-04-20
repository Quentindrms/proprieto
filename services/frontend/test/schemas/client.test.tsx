import { CreateClientSchema, type CreateClientType } from "@schemas/client";
import { describe, expect, it } from "vitest";

const validData: CreateClientType = {
    name: "Smith",
    firstName: "Johny",
    email: "john.smith@mail.com",
    address: "10 boulevard de la Paix, 75016 Paris",
    phone: "0650123045",
};

describe("Schema client", () => {
    it("Accepte les données valides", () => {
        const result = CreateClientSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it("Refuse un format d'email invalide", () => {
        const result = CreateClientSchema.safeParse({
            ...validData,
            email: "john.smith@mail"
        })
        expect(result.success).toBe(false);
    })
})

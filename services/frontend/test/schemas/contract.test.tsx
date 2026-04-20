import {
    CreateContractSchema,
    type CreateContractType,
} from "@schemas/contract";
import { describe, expect, it } from "vitest";

const validData: CreateContractType = {
    startDate: new Date(),
    endDate: new Date(),
    lease: 100,
    propertyId: crypto.randomUUID(),
    clientId: crypto.randomUUID(),
};

describe("Schema contrat", () => {
    it("Accepte les données valides", () => {
        const result = CreateContractSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it("Rejette une date invalide", () => {
        const result = CreateContractSchema.safeParse({ ...validData, startDate: "32/13/2026" });
        expect(result.success).toBe(false);
    })

    it("Rejette les montants négatifs", () => {
        const result = CreateContractSchema.safeParse({ ...validData, lease: (-100) })
        expect(result.success).toBe(false);
    })

    it("Rejette les UUID incorrects", () => {
        const result = CreateContractSchema.safeParse({ ...validData, clientId: "identifiant", propertyId: "identifiant" })
        expect(result.success).toBe(false);
    })
});

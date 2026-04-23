import { vi } from "vitest";

export function mockFetch(response: unknown, ok = true, status = 200) {
	return vi.fn().mockResolvedValue({
		ok,
		status,
		statusText: ok ? "OK" : "Error",
		json: vi.fn().mockResolvedValue(response),
	});
}

export function mockFetchError(statusText = "Internal Server Error", status = 500) {
	return mockFetch(null, false, status);
}

export const validUser = {
	name: "Dupont",
	firstName: "Jean-Pierre",
	email: "jean.dupont@example.com",
	address: "12 rue de la Paix, Paris 75001",
	phone: "0612345678",
	password: "MotDePasseSecure123!",
	passwordValidation: "MotDePasseSecure123!",
};

export const validClient = {
	name: "Martin",
	firstName: "Pierre-Louis",
	email: "pierre.martin@example.com",
	address: "45 avenue Victor Hugo, Lyon 69001",
	phone: "0698765432",
};

export const validProperty = {
	name: "Appartement T3 Paris 11ème arrondissement",
	purchasePrice: 350000,
	purchaseDate: new Date("2023-01-15"),
	type: "550e8400-e29b-41d4-a716-446655440000",
};

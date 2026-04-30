import { validate } from "class-validator";
import { CreatePropertyDto } from "./property.dto";

describe("CreatePropertyDto", () => {
	function buildDto(overrides: Partial<CreatePropertyDto> = {}): CreatePropertyDto {
		const dto = new CreatePropertyDto();
		dto.name = "Appartement Paris 11e";
		dto.purchasePrice = 250000;
		dto.purchaseDate = "2024-01-15";
		dto.type = "550e8400-e29b-41d4-a716-446655440000";
		Object.assign(dto, overrides);
		return dto;
	}

	it("accepte un body valide avec purchasePrice en number", async () => {
		const errors = await validate(buildDto());
		expect(errors).toHaveLength(0);
	});

	it("rejette purchasePrice sous forme de string", async () => {
		const dto = buildDto({ purchasePrice: "250000" as unknown as number });
		const errors = await validate(dto);
		expect(errors.some((e) => e.property === "purchasePrice")).toBe(true);
	});

	it("rejette un purchasePrice manquant", async () => {
		const dto = buildDto({ purchasePrice: undefined as unknown as number });
		const errors = await validate(dto);
		expect(errors.some((e) => e.property === "purchasePrice")).toBe(true);
	});

	it("rejette une purchaseDate invalide", async () => {
		const dto = buildDto({ purchaseDate: "not-a-date" });
		const errors = await validate(dto);
		expect(errors.some((e) => e.property === "purchaseDate")).toBe(true);
	});

	it("rejette un type qui n'est pas un UUID", async () => {
		const dto = buildDto({ type: "house" });
		const errors = await validate(dto);
		expect(errors.some((e) => e.property === "type")).toBe(true);
	});
});

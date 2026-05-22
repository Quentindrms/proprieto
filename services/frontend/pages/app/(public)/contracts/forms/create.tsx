import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useContract } from "@hooks/useContract";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "../+data";

export default function CreateForm() {
	const contract = useContract();
	const data = useData<Data>();

	const propertiesList = data.properties.map((property) => ({
		value: property.id,
		label: property.name,
		disabled: false,
	}));

	const clientsList = data.clients.map((client) => ({
		value: client.clients[0].id,
		label: `${client.firstName} ${client.name}`,
		disabled: false,
	}));

	return (
		<Form callback={contract.create} class="w-full">
			<div class="flex flex-col sm:flex-row gap-3">
				<div class="w-full">
					<TextField
						type="date"
						label="Date de début du contrat"
						onInput={contract.handleCreateInput("startDate")}
						required
					/>
					{contract.formError() && (
						<span class="text-red-500">
							{
								z.treeifyError(contract.formError()!.error).properties?.startDate
									?.errors[0]
							}
						</span>
					)}
				</div>
				<div class="w-full">
					<TextField
						type="date"
						label="Date de fin du contrat"
						onInput={contract.handleCreateInput("endDate")}
						required
					/>
					{contract.formError() && (
						<span class="text-red-500">
							{
								z.treeifyError(contract.formError()!.error).properties?.endDate
									?.errors[0]
							}
						</span>
					)}
				</div>
			</div>

			<TextField
				type="number"
				label="Loyer mensuel"
				onInput={contract.handleCreateInput("lease")}
				required
			/>
			{contract.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(contract.formError()!.error).properties?.lease
							?.errors[0]
					}
				</span>
			)}
			<div class="flex flex-col sm:flex-row gap-3">
				<div class="w-full">
					<Select
						label="Propriété louée"
						labelOptions="Sélectionner une propriété"
						options={propertiesList}
						onInput={contract.handleCreateInput("propertyId")}
						required
					/>
					{contract.formError() && (
						<span class="text-red-500">
							{
								z.treeifyError(contract.formError()!.error).properties?.propertyId
									?.errors[0]
							}
						</span>
					)}
				</div>
				<div class="w-full">
					<Select
						label="Client concerné"
						labelOptions="Sélectionner un client"
						options={clientsList}
						onInput={contract.handleCreateInput("clientId")}
						required
					/>
					{contract.formError() && (
						<span class="text-red-500">
							{
								z.treeifyError(contract.formError()!.error).properties?.clientId
									?.errors[0]
							}
						</span>
					)}
				</div>
			</div>

			<div class="flex justify-center p-4">
				<Button type="submit">Créer le contrat</Button>
			</div>
		</Form>
	);
}

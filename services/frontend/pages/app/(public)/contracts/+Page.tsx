import { Badge } from "@components/badge";
import { ContractBoard } from "@components/board";
import { ActionButton, ButtonGroup } from "@components/button";
import ContractExpireSoon from "@components/contract";
import { CardRevenue } from "@components/dataCard";
import Heading from "@components/heading";
import Text from "@components/text";
import { useContract } from "@hooks/useContract";
import { useModal } from "@hooks/useModal";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/create";

export default function Page() {
	const data = useData<Data>();

	const createModal = useModal(350);
	const contract = useContract();
	const stats = contract.getStats(data.contracts);

	const contractRows = data.contracts.map((contract) => ({
		clientName: contract.clientId,
		propertyName: contract.property.name,
		startDate: contract.startDate,
		endDate: contract.endDate,
		loan: contract.lease,
	}));

	return (
		<div class="w-full flex flex-col gap-5">

			<CreateModal close={createModal.close} isClosing={createModal.isClosing} isOpened={createModal.isOpened} />

			<div class="flex items-center justify-between p-2">
				<div class="flex flex-col">
					<Heading components="h1" size="extra-large" fontClasses="bold">
						Gestion des baux
					</Heading>
					<Text class="text-muted-text font-base-regular">
						Supervisez l'ensemble de vos engagements locatifs
					</Text>
				</div>
				<ActionButton onClick={createModal.open}>Ajouter un nouveau bail</ActionButton>
			</div>

			<div>
				<ButtonGroup
					options={[
						{ label: "Tous les baux", value: "all", onClick: () => { } },
						{ label: "Actifs", value: "active", onClick: () => { } },
						{ label: "Archivés", value: "archived", onClick: () => { } },
					]}
				/>
			</div>
			<div class="flex gap-2">
				<div class="flex flex-col w-2xl p-4 gap-2 bg-background-base rounded-md">
					<div class="flex justify-between items-center">
						<Heading components="h3" size="medium" fontClasses="bold">
							Baux arrivant à terme (nombre)
						</Heading>
						<div>
							<Badge color="warning">Action requise</Badge>
						</div>
					</div>
					<div class="flex flex-col gap-4">
						<ContractExpireSoon
							clientName="Estelle Haubois"
							contractName="Appartement Paris"
							expireDate={new Date()}
							onRenew={() => {
								console.log("Renouvelement");
							}}
						/>
						<ContractExpireSoon
							clientName="Estelle Haubois"
							contractName="Appartement Paris"
							expireDate={new Date()}
							onRenew={() => {
								console.log("Renouvelement");
							}}
						/>
					</div>
				</div>
				<div>
					<CardRevenue stat={5500} title="Revenu de contrat" comment="+12%" />
				</div>
			</div>
			<ContractBoard contracts={contractRows} />
		</div>
	);
}

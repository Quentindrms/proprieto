import { Badge } from "@components/badge";
import { ContractBoard } from "@components/board";
import { ButtonGroup } from "@components/button";
import ContractExpireSoon from "@components/contract";
import { CardRevenue } from "@components/dataCard";
import Heading from "@components/heading";
import PageNamer from "@components/pageNamer";
import { useContract } from "@hooks/useContract";
import { useModal } from "@hooks/useModal";
import { For } from "solid-js";
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
			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<PageNamer
				onClick={createModal.open}
				pageName="Gestion des baux"
				subText="Supervisez l'ensemble de vos engagements locatifs"
				buttonText="Ajouter un nouveau bail"
			/>

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
						<For each={stats.endSoon}>
							{(contract) => (
								<ContractExpireSoon
									clientName={`Ajouter les noms clients`}
									contractName={contract.property.name}
									expireDate={contract.endDate}
									onRenew={() => { }}
								/>
							)}
						</For>
						{stats.endSoon.length === 0 && <Heading components="h2" size="medium">Aucun contrat expirant prochainement</Heading>}
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

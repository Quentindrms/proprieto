import type { Contract } from "@app/types/contract";
import { Badge } from "@components/badge";
import { Board } from "@components/board";
import { ButtonGroup } from "@components/button";
import ContractExpireSoon from "@components/contract";
import Heading from "@components/heading";
import PageNamer from "@components/pageNamer";
import type { ContractRowData } from "@components/rows";
import { ContractRow } from "@components/rows";
import { useContract } from "@hooks/useContract";
import { useModal } from "@hooks/useModal";
import { contractsBoardTitle } from "@libs/boardTitle";
import clsx from "clsx";
import { createSignal, For, Show } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "./+data";
import CreateModal from "./modals/create";
import RenewModal from "./modals/renew";

export default function Page() {
	const data = useData<Data>();

	const [visibility, setVisibility] = createSignal<
		"all" | "onGoing" | "expired"
	>("all");
	const [renewContract, setRenewContract] = createSignal<Contract>();

	const createModal = useModal(350);
	const renewModal = useModal(350);
	const contract = useContract();
	const stats = contract.getStats(data.contracts);

	const allContracts = contract.sortContract(data.contracts);
	const mixedContracts = allContracts.expired.concat(allContracts.onGoing);

	return (
		<div class="w-full flex flex-col gap-5">
			<CreateModal
				close={createModal.close}
				isClosing={createModal.isClosing}
				isOpened={createModal.isOpened}
			/>

			<RenewModal
				close={renewModal.close}
				isClosing={renewModal.isClosing}
				isOpened={renewModal.isOpened}
				contract={renewContract()}
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
						{
							label: "Tous les baux",
							value: "all",
							onClick: () => setVisibility("all"),
						},
						{
							label: "Actifs",
							value: "active",
							onClick: () => setVisibility("onGoing"),
						},
						{
							label: "Archivés",
							value: "archived",
							onClick: () => setVisibility("expired"),
						},
					]}
				/>
			</div>
			<div class="flex gap-2">
				<div class="flex flex-col w-md md:w-md lg:w-lg p-4 gap-2 bg-background-base rounded-xl shadow-md max-h-75 overflow-scroll">
					<div class="flex justify-between items-center">
						<Heading components="h3" size="medium" fontClasses="bold">
							Baux arrivant à terme :{" "}
							<span
								class={clsx([
									stats.endSoon.length > 1
										? "text-action-orange"
										: "text-action-green",
								])}
							>
								{stats.endSoon.length}
							</span>
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
									onRenew={() => { setRenewContract(contract); renewModal.open(); }}
								/>
							)}
						</For>
						{stats.endSoon.length === 0 && (
							<Heading components="h2" size="medium">
								Aucun contrat expirant prochainement
							</Heading>
						)}
					</div>
				</div>
			</div>
			<Show when={visibility() === "all"}>
				<Board
					body={{
						data: mixedContracts,
						renderRow: (item: ContractRowData) => <ContractRow {...item} />,
					}}
					header={{ title: contractsBoardTitle }}
				/>
			</Show>

			<Show when={visibility() === "onGoing"}>
				<Board
					body={{
						data: allContracts.onGoing,
						renderRow: (item: ContractRowData) => <ContractRow {...item} />,
					}}
					header={{ title: contractsBoardTitle }}
				/>
			</Show>

			<Show when={visibility() === "expired"}>
				<Board
					body={{
						data: allContracts.expired,
						renderRow: (item: ContractRowData) => <ContractRow {...item} />,
					}}
					header={{ title: contractsBoardTitle }}
				/>
			</Show>
		</div>
	);
}

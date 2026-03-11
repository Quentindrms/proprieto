import { StatCard, StatCardWrapper } from "../../../../components/cards";
import ClientCard from "../../../../components/clientCard";
import PageNamer from "../../../../components/pageNamer";

export default function Page() {
	return (
		<div class="w-dvw h-dvh">
			<PageNamer
				pageName="Mes clients"
				buttonText="Ajouter un client"
				onClick={() => {}}
			/>
			<StatCardWrapper>
				<StatCard legend="Clients totaux" value="0" title="" />

				<StatCard legend="Avec contrat actif" value="0" title="" />

				<StatCard legend="Sans contrat" value="0" title="" />
			</StatCardWrapper>

			<div class="p-5 grid [grid-template-columns:max-content_max-content_max-content] gap-x-5 gap-y-5">
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "Mouloud",
						phone: "0600741537",
						surname: "SALARABE",
					}}
				/>
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "Mouloud",
						phone: "0600741537",
						surname: "SALARABE",
					}}
				/>
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "Mouloud",
						phone: "0600741537",
						surname: "SALARABE",
					}}
				/>
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "Mouloud",
						phone: "0600741537",
						surname: "SALARABE",
					}}
				/>
			</div>
		</div>
	);
}

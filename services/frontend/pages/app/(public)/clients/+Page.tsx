import { StatCard, StatCardWrapper } from "@components/cards";
import ClientCard from "@components/clientCard";
import PageNamer from "@components/pageNamer";

export default function Page() {
	return (
		<div class="w-dvw">
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

			<div class="grid grid-cols-3 gap-2">
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "PRÉNOM",
						phone: "0600741537",
						surname: "NOM DE FAMILLE",
					}}
				/>
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "PRÉNOM",
						phone: "0600741537",
						surname: "NOM DE FAMILLE",
					}}
				/>
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "PRÉNOM",
						phone: "0600741537",
						surname: "NOM DE FAMILLE",
					}}
				/>
				<ClientCard
					client={{
						adress: "13 rue des écoles 69000 LYON",
						email: "email@email.fr",
						name: "PRÉNOM",
						phone: "0600741537",
						surname: "NOM DE FAMILLE",
					}}
				/>
			</div>
		</div>
	);
}

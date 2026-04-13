import type { IncomeDetail } from "@app/types/income";
import type { OutcomeDetail } from "@app/types/outcome";
import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import { onDeleteFlux } from "@hooks/useFinance.telefunc";
import clsx from "clsx";
import type { Accessor } from "solid-js";

interface DetailsModalProps {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
    detail: IncomeDetail | OutcomeDetail | null;
    selected: { id: string; type: "income" | "outcome" } | null;
}

export default function DetailsModal(props: DetailsModalProps) {
    const label = () => props.selected?.type === "income" ? "revenu" : "dépense";
    const issueDate = () => props.detail ? new Date(props.detail.issueDate).toLocaleDateString("fr-FR") : "";

    return (
        <Modal
            isClosing={props.isClosing}
            isOpened={props.isOpened}
            close={props.close}
        >
            <ModalHeader>
                <Heading class="" components="h2" size="medium" fontClasses="bold">
                    Détails de votre {label()} du {issueDate()}
                </Heading>
            </ModalHeader>
            <ModalBody>
                <Text>Intitulé : {props.detail?.name}</Text>
                <Text>Montant : {props.detail?.amount} €</Text>
                <Text>Date de mise en recouvrement : {issueDate()}</Text>
                <Text>Statut :
                    <Text components="span" class={clsx([props.detail?.isPaid ? "text-action-green" : "text-action-red"])}>{props.detail?.isPaid ? "Payé" : "En attente"}
                    </Text>
                </Text>
                <div class="flex gap-2 justify-between">
                    <ActionButton>Modifier</ActionButton>
                    {props.selected ? <ActionButton onClick={() => props.selected && onDeleteFlux(props.selected.id, props.selected.type)}>Supprimer</ActionButton> : <ActionButton disabled>Supprimer</ActionButton>}
                </div>
            </ModalBody>
        </Modal>
    );
}

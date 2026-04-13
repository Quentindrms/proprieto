import type { FluxBoardItem } from "@components/board";
import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import type { Accessor } from "solid-js";

interface DetailsModal {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
    finances: FluxBoardItem;
}

export default function DetailsModal(props: DetailsModal) {
    return (
        <Modal
            isClosing={props.isClosing}
            isOpened={props.isOpened}
            close={props.close}
        >
            <ModalHeader>
                <Heading class="" components="h2" size="medium" fontClasses="bold">
                    Détails de votre {props.finances.type === "income" && "revenu" || props.finances.type === "outcome" && "dépense"} du {props.finances.issueDate}
                </Heading>
            </ModalHeader>
            <ModalBody>
                <Text>Intitulé : {props.finances.name}</Text>
                <Text>Montant : {props.finances.amount} €</Text>
                <Text>Catégorie : {props.finances.category}</Text>
                <Text>Date de mise en recouvrement : {props.finances.issueDate}</Text>
                <Text>Statut : !!!mettre le statut!!!</Text>
                <div class="flex gap-2 justify-between">
                    <ActionButton>Modifier</ActionButton>
                    <ActionButton>Supprimer</ActionButton>
                </div>
            </ModalBody>
        </Modal>
    );
}

import type { Client } from "@app/types/client";
import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import type { Accessor } from "solid-js";

interface DetailsModalProps {
    close: () => void;
    isOpened: Accessor<boolean>;
    isClosing: Accessor<boolean>;
    client: Client;
}

export default function DetailsModal(props: DetailsModalProps) {
    return (
        <Modal
            close={props.close}
            isOpened={props.isOpened}
            isClosing={props.isClosing}
        >
            <ModalHeader>
                <Heading components="h2" size="medium">
                    Consulter les détails d'un client
                </Heading>
            </ModalHeader>
            <ModalBody>
                <Text>{props.client.firstName} {props.client.name}</Text>
                <Text>Adresse : {props.client.address}</Text>
                <Text>Addresse email: {props.client.email}</Text>
                <Text>Téléphone : {props.client.phone}</Text>
                <div class="flex justify-between">
                    <ActionButton>Modifier</ActionButton>
                    <ActionButton>Supprimer</ActionButton>
                </div>
            </ModalBody>
        </Modal>
    );
}

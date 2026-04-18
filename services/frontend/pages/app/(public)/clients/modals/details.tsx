import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import { useClientContext } from "@hooks/useClient";
import type { Accessor } from "solid-js";
import { fi } from "zod/locales";

interface DetailsModalProps {
    close: () => void;
    isOpened: Accessor<boolean>;
    isClosing: Accessor<boolean>;
    onEdit: () => void,
}

export default function DetailsModal(props: DetailsModalProps) {

    const client = useClientContext();

    async function handleDelete() {
        const success = await client.remove();
        if (success) {
            props.close();
            return
        }
        return
    }

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
                <Text>{client.clientDetails().firstName} {client.clientDetails().name}</Text>
                <Text>Adresse : {client.clientDetails().address}</Text>
                <Text>Addresse email: {client.clientDetails().email}</Text>
                <Text>Téléphone : {client.clientDetails().phone}</Text>
                <div class="flex justify-between">
                    <ActionButton onClick={props.onEdit}>Modifier</ActionButton>
                    <ActionButton onClick={handleDelete}>Supprimer</ActionButton>
                </div>
            </ModalBody>
        </Modal>
    );
}

import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import { useProviderContext } from "@hooks/useProvider";
import { FiMail, FiPhone } from "solid-icons/fi";
import type { Accessor } from "solid-js";

interface DetailsModalProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    onEdit: () => void,
    onDelete: () => void,
}

export default function DetailsModal(props: DetailsModalProps) {

    const provider = useProviderContext();

    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h2" size="large">Détails d'un préstataire</Heading>
            </ModalHeader>
            <ModalBody>
                <Text>{provider.details().directories.firstName} {provider.details().directories.name}</Text>
                <Text>{provider.details().directories.address}</Text>
                <div class="flex flex-col gap-5">
                    <div class="flex gap-3">
                        <FiPhone size={25} color="var(--color-deep-neutral)" />
                        <Text class="font-extrabold">{provider.details().directories.phone}</Text>
                    </div>
                    <div class="flex gap-3">
                        <FiMail size={25} color="var(--color-deep-neutral)" />
                        <Text>{provider.details().directories.email}</Text>
                    </div>
                </div>
                <div class="flex justify-between p-5">
                    <ActionButton onClick={props.onEdit}>Modifier</ActionButton>
                    <ActionButton onClick={props.onDelete}>Supprimer</ActionButton>
                </div>
            </ModalBody>
        </Modal>
    )
}

import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import { useProviderContext } from "@hooks/useProvider";
import type { Accessor } from "solid-js";

interface DetailsModalProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
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
                <p>{provider.providerDetails()?.directories.name}</p>
            </ModalBody>
        </Modal>
    )
}

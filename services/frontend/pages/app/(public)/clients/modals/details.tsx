import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";

interface DetailsModalProps {
    close: () => void;
    isOpened: Accessor<boolean>;
    isClosing: Accessor<boolean>;
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
                <Heading components="h1" size="large">Hello world</Heading>
            </ModalBody>
        </Modal>
    );
}

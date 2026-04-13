import type { Property } from "@app/types/property";
import Heading from "@components/heading";
import { Modal, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";

interface ModalProps {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
    property: Property;
}

export default function DetailsModal(props: ModalProps) {
    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h2" size="medium">
                    Détails de {props.property.name}
                </Heading>
            </ModalHeader>
        </Modal>
    );
}

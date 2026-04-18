import Heading from "@components/heading";
import { Modal, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";

interface EditModalProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
}

export default function EditModal(props: EditModalProps) {
    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h2" size="large">
                    Éditer un préstataire
                </Heading>
            </ModalHeader>
        </Modal>
    );
}

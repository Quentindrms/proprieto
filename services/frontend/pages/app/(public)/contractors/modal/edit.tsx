import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import EditForm from "../form/edit";

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
            <ModalBody>
                <EditForm />
            </ModalBody>
        </Modal>
    );
}

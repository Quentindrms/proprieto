import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import EditForm from "../forms/edit";

interface EditClientModalProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
}

export default function EditClientModal(props: EditClientModalProps) {

    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h2" size="large">Éditer un client</Heading>
            </ModalHeader>
            <ModalBody>
                <EditForm />
            </ModalBody>
        </Modal>
    )
}

import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import CreateForm from "../form/createForm";

interface CreateModalProps {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
}

export default function CreateModal(props: CreateModalProps) {
    return (
        <Modal
            isClosing={props.isClosing}
            close={props.close}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h3"
                    size="medium">Ajouter un revenu</Heading>
            </ModalHeader>
            <ModalBody>
                <CreateForm />
            </ModalBody>
        </Modal>
    )
}

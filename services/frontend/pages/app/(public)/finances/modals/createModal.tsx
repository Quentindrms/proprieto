import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import { CreateOutcomeForm } from "../forms/create";

interface CreateModalProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
}

export default function CreateModal(props: CreateModalProps) {
    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h1" size="medium">Ajouter une dépense ou un revenu</Heading>
            </ModalHeader>
            <ModalBody>
                <CreateOutcomeForm />
            </ModalBody>
        </Modal>
    )
}

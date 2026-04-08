import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import CreatePropertyForm from "../form/form";

interface CreateModalProps {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
}

export default function CreateModal(props: CreateModalProps) {
    return (
        <Modal
            isClosing={props.isClosing}
            isOpened={props.isOpened}
            close={props.close}
        >
            <ModalHeader>
                <Heading class="p-2" components="h3" size="medium" fontClasses="bold">
                    Ajouter un bien
                </Heading>
            </ModalHeader>
            <ModalBody>
                <CreatePropertyForm />
            </ModalBody>
        </Modal>
    );
}

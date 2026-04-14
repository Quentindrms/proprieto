import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import { useFinanceContext } from "@hooks/useFinance";
import type { Accessor } from "solid-js";
import { EditOutcomeForm } from "../forms/edit";

interface EditModalProps {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
}

export default function EditModal(props: EditModalProps) {
    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h3" size="medium">
                    Édition
                </Heading>
            </ModalHeader>
            <ModalBody>
                <EditOutcomeForm />
            </ModalBody>
        </Modal>
    );
}

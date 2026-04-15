import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";

interface EditPropertyProps {
    isOpened: Accessor<boolean>;
    isClosed: Accessor<boolean>;
    close: () => void;
    open: () => void;
}

export default function EditProperty(props: EditPropertyProps) {
    return (
        <Modal
            isOpened={props.isOpened}
            isClosing={props.isClosed}
            close={props.close}
        >
            <ModalHeader>
                <Heading components="h3" size="large">Édition d'une propriété</Heading>
            </ModalHeader>
            <ModalBody>
                <p>Prout le monde</p>
            </ModalBody>
        </Modal>
    )
}

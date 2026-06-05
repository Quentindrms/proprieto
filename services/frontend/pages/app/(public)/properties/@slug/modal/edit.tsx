import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import UpdateProperty from "../form/edit";

interface EditPropertyProps {
    isOpened: Accessor<boolean>;
    isClosing: Accessor<boolean>;
    close: () => void;
}

export default function EditProperty(props: EditPropertyProps) {

    return (
        <Modal
            isOpened={props.isOpened}
            isClosing={props.isClosing}
            close={props.close}
        >
            <ModalHeader>
                <Heading components="h3" size="large">Édition d'une propriété</Heading>
            </ModalHeader>
            <ModalBody>
                <UpdateProperty onSuccess={props.close} />
            </ModalBody>
        </Modal>
    )
}

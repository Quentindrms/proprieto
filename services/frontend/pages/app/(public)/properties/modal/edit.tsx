import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import { useProperty } from "@hooks/useProperty";
import type { Accessor } from "solid-js";
import UpdateProperty from "../form/update";

interface EditPropertyProps {
    isOpened: Accessor<boolean>;
    isClosing: Accessor<boolean>;
    close: () => void;
}

export default function EditProperty(props: EditPropertyProps) {

    const property = useProperty();

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

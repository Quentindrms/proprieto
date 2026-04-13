import type { FluxBoardItem } from "@components/board";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";

interface DetailsModal {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
    finances: FluxBoardItem;
}

export default function DetailsModal(props: DetailsModal) {
    return (
        <Modal
            isClosing={props.isClosing}
            isOpened={props.isOpened}
            close={props.close}
        >
            <ModalHeader>
                <Heading class="" components="h2" size="medium" fontClasses="bold">
                    Coucou le monde
                </Heading>
            </ModalHeader>
            <ModalBody>
                <p>Hello world {props.finances.name}</p>
            </ModalBody>
        </Modal>
    );
}

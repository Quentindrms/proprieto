import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "../+data";
import EditForm from "../form/edit";

interface EditContractProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
}

export default function EditModal(props: EditContractProps) {
    const data = useData<Data>();

    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h3" size="medium">Modification du contrat avec {data.client.firstName} {data.client.name}</Heading>
            </ModalHeader>
            <ModalBody>
                <EditForm />
            </ModalBody>
        </Modal>
    );
}

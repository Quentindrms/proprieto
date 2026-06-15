import type { Contract } from "@app/types/contract";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import { type Accessor, Show } from "solid-js";
import RenewForm from "../forms/renew";

interface RenewModalProps {
    contract: Contract | undefined;
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
}

export default function RenewModal(props: RenewModalProps) {
    if (!props.contract) {
        props.close();
        console.log(props.contract)
    }
    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h3" size="medium">
                    Renouvellement du contrat
                </Heading>
            </ModalHeader>
            <ModalBody>
                {props.contract ? <RenewForm
                    contract={props.contract}
                /> : ""}
            </ModalBody>
        </Modal>
    );
}

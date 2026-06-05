import type { Property } from "@app/types/property";
import { Button } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import type { Accessor } from "solid-js";

interface ModalProps {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
    property: Property;
    delete: (property: Property) => void;
}

export default function DeleteModal(props: ModalProps) {

    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h2" size="medium">Suppression - {props.property.name}</Heading>
            </ModalHeader>
            <ModalBody>
                <Text class="text-action-orange" bold>La suppression de cette propriété entrainera la suppression des dépenses et revenus associés.</Text>
                <Text class="text-action-orange" bold>Êtes vous certain de vouloir continuer ?</Text>
                <div class="flex gap-4">
                    <Button type="button" color="green" onClick={props.close}>Annuler</Button>
                    <Button type="button" color="red" onClick={() => props.delete}>Supprimer</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

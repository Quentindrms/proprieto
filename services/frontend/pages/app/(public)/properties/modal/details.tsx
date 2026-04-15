import type { Property } from "@app/types/property";
import { ActionButton } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import { type Accessor, Show } from "solid-js";

interface ModalProps {
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
    close: () => void;
    property: Property;
    edit: (property: Property) => void;
}

export default function DetailsModal(props: ModalProps) {

    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h2" size="medium">
                    Détails de {props.property.name}
                </Heading>
            </ModalHeader>
            <ModalBody>
                <Heading components="h4" size="large">
                    {props.property.name}
                </Heading>
                <div class="flex gap-3">
                    <Text>Date d'acquisition : {props.property.purchaseDate && new Date(props.property.purchaseDate).toLocaleDateString("fr-FR")}€</Text>
                    <Text>Prix d'acquisition : {props.property.purchasePrice}€</Text>
                </div>
                <Show when={props.property.sellDate && props.property.sellPrice}>
                    <div class="flex gap-3">
                        <Text>
                            Date de vente :
                            {props.property.sellDate && new Date(props.property.sellDate).toLocaleDateString("fr-FR")}
                        </Text>
                        <Text>Prix de vente : {props.property.sellPrice}</Text>
                    </div>
                </Show>
                <div>
                    <Text>Catégorie : {props.property.propertyType.name}</Text>
                </div>
                <div class="flex justify-around">
                    <ActionButton color="black" onClick={() => props.edit(props.property)}>Modifier</ActionButton>
                    <ActionButton color="black">Supprimer</ActionButton>
                </div>
            </ModalBody>
        </Modal>
    );
}

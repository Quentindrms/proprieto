import { Button } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import Text from "@components/text";
import { useContract } from "@hooks/useContract";
import type { Accessor } from "solid-js";
import { useData } from "vike-solid/useData";
import type { Data } from "../+data";

interface DeleteModalProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
}

export default function DeleteModal(props: DeleteModalProps) {
    const data = useData<Data>();
    const contract = useContract();

    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h4" size="large">
                    Supprimer votre contrat avec{" "}
                    {data.contract.client.directory.firstName}{" "}
                    {data.contract.client.directory.name}
                </Heading>
            </ModalHeader>
            <ModalBody>
                <Text class="">
                    La suppression de ce contrat entrainera la suppression des revenus
                    associés.
                </Text>
                <Text class="">Êtes vous certain de vouloir continuer ?</Text>
                <div class="flex gap-4">
                    <Button type="button" color="green" onClick={props.close}>
                        Annuler
                    </Button>
                    <Button
                        type="button"
                        color="red"
                        onClick={() => contract.deleteContract(data.contract.id)}
                    >
                        Supprimer
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}

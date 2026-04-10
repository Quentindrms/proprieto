import { ButtonGroup } from "@components/button";
import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import { type Accessor, createSignal, Show } from "solid-js";
import { CreateIncomeForm, CreateOutcomeForm } from "../forms/create";

interface CreateModalProps {
    close: () => void;
    isClosing: Accessor<boolean>;
    isOpened: Accessor<boolean>;
}

export default function CreateModal(props: CreateModalProps) {
    const [isIncome, setIsIncome] = createSignal<boolean>(false);

    return (
        <Modal
            close={props.close}
            isClosing={props.isClosing}
            isOpened={props.isOpened}
        >
            <ModalHeader>
                <Heading components="h1" size="medium">
                    Ajouter une dépense ou un revenu
                </Heading>
            </ModalHeader>
            <ModalBody>
                <ButtonGroup
                    options={[
                        {
                            label: "Dépense",
                            value: "income",
                            onClick: () => setIsIncome(false),
                        },
                        {
                            label: "Revenue",
                            value: "outcome",
                            onClick: () => setIsIncome(true),
                        },
                    ]}
                />
                <Show when={isIncome()} fallback={<CreateOutcomeForm />}>
                    <CreateIncomeForm />
                </Show>
            </ModalBody>
        </Modal>
    );
}

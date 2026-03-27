import Heading from "@components/heading";
import { Modal, ModalBody, ModalHeader } from "@components/modal";
import type { Accessor } from "solid-js";
import CreateForm from "../forms/create";

interface CreateModalProps {
	isOpened: Accessor<boolean>;
	isClosing: Accessor<boolean>;
	close: () => void;
}

export default function CreateModal(props: CreateModalProps) {
	return (
		<Modal
			close={props.close}
			isClosing={props.isClosing}
			isOpened={props.isOpened}
		>
			<ModalHeader>
				<Heading components="h3" size="medium">
					Créer un client
				</Heading>
			</ModalHeader>
			<ModalBody>
				<CreateForm />
			</ModalBody>
		</Modal>
	);
}

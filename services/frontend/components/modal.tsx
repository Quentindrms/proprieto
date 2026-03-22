import clsx from "clsx";
import {
	type Accessor,
	createContext,
	createSignal,
	type JSX,
	Show,
	splitProps,
} from "solid-js";

interface ModalProps extends JSX.HTMLAttributes<HTMLDivElement> {
	isOpened: Accessor<boolean>;
	isClosing: Accessor<boolean>;
	close: () => void;
	children: JSX.Element;
}

const ModalContext = createContext<{ close: () => void }>({
	close: () => {},
});

export default function Modal(props: ModalProps) {
	const [local, rest] = splitProps(props, [
		"isOpened",
		"isClosing",
		"close",
		"children",
	]);

	function handleClickOuter(event: MouseEvent | KeyboardEvent) {
		if (event.target === event.currentTarget) {
			event.stopPropagation();
			event.preventDefault();
			local.close();
		}
	}

	function isClosed() {
		return local.isClosing() || !local.isOpened();
	}

	return (
		<ModalContext.Provider value={{ close: local.close }}>
			<div
				{...rest}
				role="dialog"
				onClick={handleClickOuter}
				onKeyPress={() => {}}
				class={clsx(
					"fixed flex justify-center items-center inset-0 z-50 bg-background-elevated/50 backdrop-blur-sm transition-opacity duration-300",
					{ "opacity-0 pointer-events-none": isClosed() },
					{ "opacity-100": !isClosed() },
					rest.class,
				)}
			>
				<section>{local.children}</section>
			</div>
		</ModalContext.Provider>
	);
}

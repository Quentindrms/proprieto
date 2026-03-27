import clsx from "clsx";
import {
	type Accessor,
	createContext,
	type JSX,
	splitProps,
	useContext,
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

export function Modal(props: ModalProps) {
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
				<section class="bg-background-surface w-2xl flex flex-col border border-background-border rounded-xl p-2 gap-2">
					{local.children}
				</section>
			</div>
		</ModalContext.Provider>
	);
}

interface ModalHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ModalHeader(props: ModalHeaderProps) {
	const modal = useContext(ModalContext);

	return (
		<header
			class={clsx(
				"flex justify-between items-center border-b border-background-border",
				props.class,
			)}
		>
			{props.children}
			<button type="button" onClick={modal.close} class="text-primary">
				X
			</button>
		</header>
	);
}

interface ModalBodyProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ModalBody(props: ModalBodyProps) {
	return (
		<div
			{...props}
			class={clsx(
				"p-2 grow overflow-y-auto bg-background-surface rounded-b-md",
			)}
		>
			{props.children}
		</div>
	);
}

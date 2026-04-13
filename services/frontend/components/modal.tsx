import clsx from "clsx";
import { FaSolidClose } from "solid-icons/fa";
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
	close: () => { },
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
				onKeyPress={() => { }}
				class={clsx(
					"fixed flex justify-center items-center inset-0 z-50 bg-background-base/10 backdrop-blur-sm transition-opacity duration-300",
					{ "opacity-0 pointer-events-none": isClosed() },
					{ "opacity-100": !isClosed() },
					rest.class,
				)}
			>
				<section class="bg-background-base w-2xl flex flex-col justify-center items-center rounded-xl p-5 gap-2">
					{local.children}
				</section>
			</div>
		</ModalContext.Provider>
	);
}

interface ModalHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
}

export function ModalHeader(props: ModalHeaderProps) {
	const modal = useContext(ModalContext);

	return (
		<header
			class={clsx(
				"w-full flex justify-between items-center border-b border-background-muted",
				props.class,
			)}
		>
			{props.children}
			<FaSolidClose size={25} color="var(--color-background-dark)" onClick={modal.close} />
		</header>
	);
}

interface ModalBodyProps extends JSX.HTMLAttributes<HTMLDivElement> { }

export function ModalBody(props: ModalBodyProps) {
	return (
		<div
			{...props}
			class={clsx(
				"p-2 grow overflow-y-auto bg-background-surface rounded-b-md flex  flex-col gap-4",
			)}
		>
			{props.children}
		</div>
	);
}

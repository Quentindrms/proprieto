import { createSignal } from "solid-js";

export function useModal(delay: number) {
	const [isOpened, setIsOpened] = createSignal<boolean>(false);
	const [isClosing, setIsClosing] = createSignal<boolean>(false);
	const [isClosingTimeout, setIsClosingTimeOut] =
		createSignal<NodeJS.Timeout | null>(null);

	function clearClosingTimeout() {
		const timeout = isClosingTimeout();
		if (timeout) clearTimeout(timeout);
	}

	function open() {
		setIsOpened(true);
		setIsClosing(false);
	}

	function close() {
		setIsOpened(false);
		setIsClosing(true);
		setIsClosingTimeOut(
			setTimeout(() => {
				setIsClosing(false);
				setIsOpened(false);
			}, delay),
		);
	}

	return {
		isOpened,
		isClosing,
		open,
		close,
	};
}

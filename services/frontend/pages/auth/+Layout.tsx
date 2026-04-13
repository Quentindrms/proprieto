import type { JSX } from "solid-js";
import { Toaster } from "solid-toast";

export default function Layout(props: { children?: JSX.Element }) {
	return (
		<div class="min-h-dvh bg-background-base flex">
			<Toaster position="top-right" />
			<main class="flex flex-1 min-w-0">{props.children}</main>
		</div>
	);
}

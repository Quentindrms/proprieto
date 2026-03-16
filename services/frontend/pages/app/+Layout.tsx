import Navbar from "@components/navbar";
import type { JSX } from "solid-js";

export default function Layout(props: { children?: JSX.Element }) {
	return (
		<div class="min-h-dvh bg-background-base flex">
			<Navbar />
			<main class="flex min-w-0">{props.children}</main>
		</div>
	);
}

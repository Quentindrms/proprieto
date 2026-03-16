import type { JSX } from "solid-js";
import Navbar from "../../components/navbar";

export default function Layout(props: { children?: JSX.Element }) {
	return (
		<div class="min-h-dvh bg-background-base flex">
			<Navbar />
			<main class="flex min-w-0">{props.children}</main>
		</div>
	);
}

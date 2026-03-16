import type { JSX } from "solid-js";
import Navbar from "../../components/navbar";

export default function Layout(props: { children?: JSX.Element }) {
	return (
		<div class="min-h-dvh bg-background-base flex">
			<Navbar />
			{props.children}
		</div>
	);
}

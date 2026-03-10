import type { JSX } from "solid-js";
import Navbar from "../../components/navbar";

export default function Layout(props: { children?: JSX.Element }) {
	return (
		<div class="bg-background-base flex">
			<Navbar />
			{props.children}
		</div>
	);
}

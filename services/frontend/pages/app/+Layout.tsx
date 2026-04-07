import Navbar from "@components/navbar";
import type { JSX } from "solid-js";
import { Toaster } from "solid-toast";

export default function Layout(props: { children?: JSX.Element }) {
	return (
		<div class="min-h-dvh min-w-full bg-background-base flex">
			<Toaster position="top-right" />
			<Navbar />
			<main class="flex w-full">{props.children}</main>
		</div>
	);
}

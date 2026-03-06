import type { JSX } from "solid-js";

export default function Layout(props: { children?: JSX.Element }) {
    return <div class="bg-background-base h-dvh">{props.children}</div>;
}

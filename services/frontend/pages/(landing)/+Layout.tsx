import type { JSX } from "solid-js";

export default function Layout(props: { children?: JSX.Element }) {
    return (
        <div class="bg-background-muted/10 h-full">
            {props.children}
        </div>
    )
}

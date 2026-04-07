import Navbar from "@components/navbar";
import type { JSX } from "solid-js";

export default function Layout(props: { children?: JSX.Element }) {
    return (
        <div class="bg-background-muted/10 h-full">
            <div class="flex">
                <Navbar />
                {props.children}
            </div>
        </div>
    )
}

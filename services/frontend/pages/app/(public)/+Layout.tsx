import type { JSX } from "solid-js";
import Navbar from "../../../components/navbar";

export default function Layout(props: { children?: JSX.Element }) {
    return <div class="flex bg-background-base gap-2">
        <Navbar />
        {props.children}
    </div>;
}

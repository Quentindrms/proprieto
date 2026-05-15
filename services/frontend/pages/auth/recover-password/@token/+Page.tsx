import Heading from "@components/heading";
import { redirect } from "vike/abort";
import { useData } from "vike-solid/useData";
import { usePageContext } from "vike-solid/usePageContext";
import type { Data } from "./+data";

export default function RecoverPassword() {
    const pageContext = usePageContext();
    const data = useData<Data>();

    if (data.response.isValid === true) {
        throw redirect("/auth/login");
    }

    return (
        <div>
            <p>Prout le monde</p>
        </div>
    );
}

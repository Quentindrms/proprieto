import { Form, TextField } from "@components/form";
import Heading from "@components/heading";
import { redirect } from "vike/abort";
import { useData } from "vike-solid/useData";
import { usePageContext } from "vike-solid/usePageContext";
import type { Data } from "./+data";

export default function RecoverPassword() {
    const pageContext = usePageContext();
    const data = useData<Data>();

    if (data.response.isUsed === true) {
        throw redirect("/auth/login");
    }

    return (
        <div>
            <Form callback={() => console.log()}>
                <TextField type="password" label="Nouveau mot de passe" />
                <TextField type="password" label="Confirmation du mot de passex" />
            </Form>
        </div>
    );
}

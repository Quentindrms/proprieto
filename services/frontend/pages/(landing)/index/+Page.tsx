import { CardProgressionBar, CardRevenue } from "@components/dataCard";
import Heading from "../../../components/heading";

export default function Page() {
    return (
        <div class="flex flex-col gap-2 p-5">

            <CardRevenue title="Le chiffre du jour" stat={1000} comment="Prout le monde" dynamic={true} />

            <CardProgressionBar value={50} max={100} min={0} title="Barre de progression" />
        </div>)
}
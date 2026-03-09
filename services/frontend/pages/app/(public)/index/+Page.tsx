import { StatCard } from "../../../../components/cards";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";

export default function Page() {

    const date = new Date();

    return (
        <div>
            <Heading components="h1" size="big" color="white">Bonjour, username</Heading>

            <Text components="p" size="base">{date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()} - Vue d'ensemble</Text>

            <div id="top-wrapper"
                class="flex gap-5 border"
            >
                <StatCard
                    legend="Deuis hier"
                    value="0"
                    accentColor="blue"
                    title="Titre"
                />

                <StatCard
                    legend="Deuis hier"
                    value="0"
                    accentColor="blue"
                    title="Titre"
                />

                <StatCard
                    legend="Deuis hier"
                    value="0"
                    accentColor="blue"
                    title="Titre"
                />

                <StatCard
                    legend="Deuis hier"
                    value="0"
                    accentColor="blue"
                    title="Titre"
                />
            </div>

        </div>
    )
}
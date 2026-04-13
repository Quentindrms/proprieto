import type { ProviderType } from "@app/types/provider";
import Heading from "./heading";

interface ProviderCardProps {
    provider: ProviderType;
}

export default function ProviderCard(props: ProviderCardProps) {
    return (
        <div>
            <Heading components="h3" size="large">{props.provider.directories.firstName} {props.provider.directories.name}</Heading>
        </div>
    );
}

import Heading from "./heading";
import Text from "./text";

interface ContractExpireSoonProps {
    clientName: string,
    contractName: string,
    expireDate: Date,
}

export default function ContractExpireSoon(props: ContractExpireSoonProps) {

    return (
        <div class="flex flex-row items-center justify-between bg-background-base rounded-xl">
            <div class="flex flex-col">
                <Heading components="h2" size="medium">{props.clientName} - {props.contractName}</Heading>
                <Text class="">Expire le {props.expireDate.toLocaleDateString("fr-FR")}</Text>
            </div>
            <p>Prout</p>
        </div>
    )
}
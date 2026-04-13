import Heading from "./heading";
import Text from "./text";

interface ContractExpireSoonProps {
    clientName: string,
    contractName: string,
    expireDate: Date,
    onRenew: () => void,
}

export default function ContractExpireSoon(props: ContractExpireSoonProps) {

    return (
        <div class="flex flex-row items-center justify-between bg-background-muted/10 rounded-xl p-2">
            <div class="flex flex-col">
                <Heading components="h2" size="medium">{props.clientName} - {props.contractName}</Heading>
                <Text class="">Expire le {new Date(props.expireDate).toLocaleDateString("fr-FR")}</Text>
            </div>
            <button type="button" class="font-base-bold underline cursor-pointer p-2" onClick={props.onRenew}>Renouveler</button>
        </div>
    )
}
import type { JSX } from "solid-js";

interface SearchFieldProps extends JSX.HTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder?: string,
}

export default function SearchField(props: SearchFieldProps) {


    return (
        <div>
            <input class="bg-background-elevated border p-2 border-background-border text-primary w-xs rounded-md"
                type="search"
                name={props.name}
                placeholder={props.placeholder}
            />
        </div>
    )
}

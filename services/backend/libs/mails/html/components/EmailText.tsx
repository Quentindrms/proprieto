import { Text } from "react-email";

interface EmailTextProps {
    children: React.ReactNode
}

export function EmailText({ children }: EmailTextProps) {
    return (<Text
        style={{
            color: "#696b7d",
            fontFamily: "Manrope, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            margin: "0 0 24px",
            lineHeight: "1.6",
        }}
    >
        {children}
    </Text>);
}

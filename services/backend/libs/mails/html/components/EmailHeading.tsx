import { Heading } from "react-email";

interface EmailHeadingProps {
    component: "h1" | "h2" | "h3" | "h4" | "h5",
    children: React.ReactNode,
}

export function EmailHeading({ component, children }: EmailHeadingProps) {
    return (
        <Heading as={component}
            style={{
                color: "#1b1b2f",
                fontFamily: "Manrope, Arial, sans-serif",
                fontSize: "20px",
                fontWeight: 800,
                margin: "0 0 8px",
                letterSpacing: "-0.2px",
            }}
        >
            {children}
        </Heading>)
}
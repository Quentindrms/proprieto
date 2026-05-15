import { Button } from "react-email";

type ButtonColor = "green" | "blue" | "dark";

interface EmailButtonProps {
	href: string;
	children: React.ReactNode;
	color?: ButtonColor;
}

const colorMap: Record<ButtonColor, { background: string; text: string }> = {
	green: { background: "#42bc7f", text: "#ffffff" },
	blue: { background: "#2d7adb", text: "#ffffff" },
	dark: { background: "#18182b", text: "#fcfcfc" },
};

export function EmailButton({
	href,
	children,
	color = "green",
}: EmailButtonProps) {
	const { background, text } = colorMap[color];

	return (
		<Button
			href={href}
			style={{
				backgroundColor: background,
				borderRadius: "12px",
				color: text,
				display: "inline-block",
				fontFamily: "Manrope, Arial, sans-serif",
				fontSize: "14px",
				fontWeight: 700,
				padding: "12px 24px",
				textDecoration: "none",
				textAlign: "center",
			}}
		>
			{children}
		</Button>
	);
}

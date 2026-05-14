import { Section, Text } from "react-email";

type InfoBoxVariant = "warning" | "info" | "success";

interface EmailInfoBoxProps {
	children: React.ReactNode;
	variant?: InfoBoxVariant;
}

const variantMap: Record<
	InfoBoxVariant,
	{ background: string; border: string; color: string }
> = {
	warning: {
		background: "#fff8ee",
		border: "#f5a623",
		color: "#7a4e00",
	},
	info: {
		background: "#eef5ff",
		border: "#2d7adb",
		color: "#1a3d6b",
	},
	success: {
		background: "#eefbf3",
		border: "#42bc7f",
		color: "#1a5c3a",
	},
};

export function EmailInfoBox({
	children,
	variant = "info",
}: EmailInfoBoxProps) {
	const { background, border, color } = variantMap[variant];

	return (
		<Section
			style={{
				backgroundColor: background,
				borderLeft: `3px solid ${border}`,
				borderRadius: "8px",
				margin: "16px 0",
				padding: "12px 16px",
			}}
		>
			<Text
				style={{
					color,
					fontFamily: "Manrope, Arial, sans-serif",
					fontSize: "13px",
					fontWeight: 500,
					margin: 0,
				}}
			>
				{children}
			</Text>
		</Section>
	);
}

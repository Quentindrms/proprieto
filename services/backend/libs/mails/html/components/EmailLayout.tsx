import {
	Body,
	Container,
	Font,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from "react-email";

const colors = {
	backgroundPrimary: "#18182b",
	backgroundBase: "#fafafa",
	slateMarked: "#f0f0f5",
	slateStrong: "#e5e6ed",
	textDark: "#1b1b2f",
	textMuted: "#696b7d",
	textLight: "#fcfcfc",
};

interface EmailLayoutProps {
	preview: string;
	children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
	return (
		<Html lang="fr">
			<Head>
				<Font
					fontFamily="Manrope"
					fallbackFontFamily="Arial"
					webFont={{
						url: "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2",
						format: "woff2",
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
				<Font
					fontFamily="Manrope"
					fallbackFontFamily="Arial"
					webFont={{
						url: "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2",
						format: "woff2",
					}}
					fontWeight={700}
					fontStyle="normal"
				/>
			</Head>
			<Preview>{preview}</Preview>
			<Body
				style={{
					backgroundColor: colors.slateMarked,
					fontFamily: "Manrope, Arial, sans-serif",
					margin: 0,
					padding: "32px 16px",
				}}
			>
				<Container
					style={{
						maxWidth: "560px",
						margin: "0 auto",
					}}
				>
					<Section
						style={{
							backgroundColor: colors.backgroundPrimary,
							borderRadius: "12px 12px 0 0",
							padding: "24px 32px",
							textAlign: "center",
						}}
					>
						<Heading
							as="h1"
							style={{
								color: colors.textLight,
								fontSize: "24px",
								fontWeight: 800,
								margin: 0,
								fontFamily: "Manrope, Arial, sans-serif",
								letterSpacing: "-0.3px",
							}}
						>
							Proprieto
						</Heading>
						<Text
							style={{
								color: "#9999b3",
								fontSize: "12px",
								fontWeight: 500,
								margin: "4px 0 0",
								fontFamily: "Manrope, Arial, sans-serif",
							}}
						>
							Gestionnaire de propriété
						</Text>
					</Section>

					<Section
						style={{
							backgroundColor: colors.backgroundBase,
							border: `2px solid ${colors.slateStrong}`,
							borderTop: "none",
							borderRadius: "0 0 12px 12px",
							padding: "32px",
						}}
					>
						{children}
					</Section>

					<Section style={{ padding: "24px 0 0", textAlign: "center" }}>
						<Hr
							style={{
								borderColor: colors.slateStrong,
								margin: "0 0 16px",
							}}
						/>
						<Text
							style={{
								color: colors.textMuted,
								fontSize: "11px",
								fontWeight: 400,
								margin: 0,
								fontFamily: "Manrope, Arial, sans-serif",
							}}
						>
							© {new Date().getFullYear()} Proprieto · noreply@quentin-derimais.fr
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

interface WelcomeProps {
	title?: string;
	subtitle?: string;
}

export default function Welcome({
	title = "Workspace Booking System",
	subtitle = "¡Hola mundo! Welcome to your workspace reservation platform",
}: WelcomeProps) {
	return (
		<div style={{ textAlign: "center" }}>
			<h1
				style={{
					fontSize: "2.25rem",
					fontWeight: "bold",
					color: "#111827",
					marginBottom: "1rem",
				}}
			>
				🏢 {title}
			</h1>
			<p
				style={{
					fontSize: "1.125rem",
					color: "#6b7280",
					marginBottom: "2rem",
				}}
			>
				{subtitle}
			</p>
		</div>
	);
}

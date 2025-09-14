interface StatusItemProps {
	text: string;
	completed?: boolean;
}

function StatusItem({ text, completed = true }: StatusItemProps) {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
			<div
				style={{
					width: "2rem",
					height: "2rem",
					backgroundColor: completed ? "#dcfce7" : "#fef3c7",
					borderRadius: "50%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
				}}
			>
				<span
					style={{
						color: completed ? "#16a34a" : "#d97706",
						fontSize: "0.875rem",
						fontWeight: "500",
					}}
				>
					{completed ? "✓" : "⏳"}
				</span>
			</div>
			<span style={{ color: "#374151" }}>{text}</span>
		</div>
	);
}

export default function SetupStatus() {
	const statusItems = [
		{ text: "Vite + React setup complete", completed: true },
		{ text: "TypeScript configured", completed: true },
		{ text: "Tailwind CSS ready", completed: true },
		{ text: "Backend API integration", completed: false },
		{ text: "Authentication system", completed: false },
	];

	return (
		<div
			style={{
				backgroundColor: "white",
				borderRadius: "0.5rem",
				boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
				padding: "1.5rem",
			}}
		>
			<h2
				style={{
					fontSize: "1.5rem",
					fontWeight: "600",
					color: "#1f2937",
					marginBottom: "1rem",
				}}
			>
				Project Status
			</h2>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				{statusItems.map((item, index) => (
					<StatusItem key={index} text={item.text} completed={item.completed} />
				))}
			</div>
		</div>
	);
}

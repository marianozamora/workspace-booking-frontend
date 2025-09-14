import "./App.css";
import { Welcome, SetupStatus } from "./components";

function App() {
	return (
		<div className='App'>
			<div
				style={{
					minHeight: "100vh",
					backgroundColor: "#f9fafb",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						maxWidth: "28rem",
						width: "100%",
						padding: "2rem",
					}}
				>
					<Welcome />
					<SetupStatus />
				</div>
			</div>
		</div>
	);
}

export default App;

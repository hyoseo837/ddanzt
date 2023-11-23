import SolitairePage from "./pages/SolitairePage";
import ProfileComponents from "./Components/ProfileComponents";

function App() {
    return (
        <div style={{ backgroundColor: "#eae9ea" }}>
            <div
                style={{
                    display: "flex",
                    // alignItems: "center",
                    height: "100%",
                    justifyContent: "center",
                    marginBottom: "100px",
                }}
            >
                <SolitairePage />
            </div>
            <ProfileComponents />
        </div>
    );
}

export default App;

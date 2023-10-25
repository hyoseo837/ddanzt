import Connect4Pad from "./components/connect4Pad";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Connect4Pad />
            </DndProvider>
        </div>
    );
}

export default App;

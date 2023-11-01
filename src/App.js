import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Connect4 from "./pages/Connect4";
import Solitaire from "./pages/Solitaire";

function App() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Solitaire />
            </DndProvider>
        </div>
    );
}

export default App;

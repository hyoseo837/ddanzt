import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SolitaireBoard from "../components/SolitaireBoard";

const Connect4 = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <SolitaireBoard />
        </DndProvider>
    );
};

export default Connect4;

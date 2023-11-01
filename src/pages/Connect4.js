import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Connect4Pad from "../components/Connect4Pad";

const Connect4 = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Connect4Pad />
        </DndProvider>
    );
};

export default Connect4;

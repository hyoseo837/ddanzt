import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Connect4 from "../games/Connect4/Connect4";

const Connect4Page = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Connect4 />
        </DndProvider>
    );
};

export default Connect4Page;

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Basket } from "../components/Basket";

const Connect4 = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Basket />
        </DndProvider>
    );
};

export default Connect4;

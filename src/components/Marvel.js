import React from "react";
import { useDrag } from "react-dnd";
import styles from "../css/marvel.module.css";

const Marvel = ({ color }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "marvel",
        item: { color },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <div
            className={styles["marvel"]}
            style={{ backgroundColor: color == "blue" ? "blue" : "red" }}
            ref={dragRef}
        ></div>
    );
};

export default Marvel;

import React, { useEffect, useRef } from "react";

const SnakeScreen = () => {
    const DrawHead = ({ direction }) => {
        const dir = ["right", "up", "left", "down"].indexOf(direction);
        return;
    };

    return (
        <div>
            <canvas></canvas>
        </div>
    );
};

export default SnakeScreen;

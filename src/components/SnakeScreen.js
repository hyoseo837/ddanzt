import React, { useEffect, useRef } from "react";

const SnakeScreen = () => {
    const canvasRef = useRef(null);

    const draw = (ctx) => {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(100, 100, 20, 0, 2 * Math.PI);
        ctx.fill();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // first draw
        context.fillStyle = "#dddddd";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        //Our draw come here
        draw(context);
    }, [draw]);

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default SnakeScreen;

import styles from "../css/gamePage.module.css";
import React, { useState } from "react";
import SnakeScreen from "../components/SnakeScreen";

const Instruction = () => {
    return (
        <div className={styles["instruction"]}>
            <h3>How to play</h3>
            <p>
                <span style={{ fontWeight: "bold" }}>Goal</span>:
            </p>
            <span style={{ fontWeight: "bold" }}>Rules</span>
            <ul></ul>
        </div>
    );
};

const SnakeGame = () => {
    const [helpShown, setHelpShown] = useState(false);
    return (
        <div>
            <div className={styles["instructionTab"]}>
                <button
                    onClick={() => {
                        setHelpShown((current) => !current);
                    }}
                    className={styles["showButton"]}
                    title="How to play?"
                >
                    ?
                </button>
                {helpShown ? <Instruction /> : null}
            </div>
            <SnakeScreen />
        </div>
    );
};

export default SnakeGame;

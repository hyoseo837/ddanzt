import { useState } from "react";
import styles from "./gamePage.module.css";
import AutoAnimal from "../games/AutoAnimal/AutoAnimal";

const Instruction = () => {
    return (
        <div className={styles["instruction"]}>
            <h3>How to play</h3>
            <p>
                <span style={{ fontWeight: "bold" }}>Goal</span>:
            </p>
            <span style={{ fontWeight: "bold" }}>Rules</span>
            <ul>
                <li></li>
            </ul>
        </div>
    );
};

const Solitaire = () => {
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
            <AutoAnimal />
        </div>
    );
};

export default Solitaire;

import { useState } from "react";
import Solitaire from "../games/Solitaire/Solitaire.js";
import styles from "./gamePage.module.css";
import Instruction from "../games/Solitaire/Instruction.js";

const SolitairePage = () => {
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
            <Solitaire />
        </div>
    );
};

export default SolitairePage;

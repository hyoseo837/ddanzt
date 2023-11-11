import { useState } from "react";
import styles from "./gamePage.module.css";
import Swords from "../games/Swords/Swords";
import Instruction from "../games/Swords/Instruction";

const SwordsPage = () => {
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
            <Swords />
        </div>
    );
};

export default SwordsPage;

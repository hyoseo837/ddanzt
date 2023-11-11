import { useState } from "react";
import Hanoi from "../games/Hanoi/Hanoi";
import styles from "./gamePage.module.css";
import Instruction from "../games/Hanoi/Instruction";

const HanoiPage = () => {
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
            <Hanoi />
        </div>
    );
};

export default HanoiPage;

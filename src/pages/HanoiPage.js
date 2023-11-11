import { useState } from "react";
import Hanoi from "../games/Hanoi/Hanoi";
import styles from "./gamePage.module.css";

const Instruction = () => {
    return (
        <div className={styles["instruction"]}>
            <h3>How to play</h3>
            <p>
                <span style={{ fontWeight: "bold" }}>Goal</span>: to move all
                the plates to the right base plate
            </p>
            <span style={{ fontWeight: "bold" }}>Rules</span>
            <ul>
                <li>you only can move one plate at once.</li>
                <li>you cannot put a plate on smaller plate.</li>
                <li>you only can move a plate that is on the top of stacks</li>
            </ul>
        </div>
    );
};

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

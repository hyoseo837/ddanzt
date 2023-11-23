import { useState } from "react";
import Solitaire from "../games/Solitaire/Solitaire.js";
import styles from "./gamePage.module.css";
import Instruction from "../games/Solitaire/Instruction.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faSteam } from "@fortawesome/free-brands-svg-icons";

const SolitairePage = () => {
    const [helpShown, setHelpShown] = useState(false);
    return (
        <div>
            <div className={styles["titleRow"]}>
                <h1 className={styles["gameTitle"]}>SHENZHEN SOLITAIRE</h1>
                <a
                    className={styles["steamLink"]}
                    title="link to original game!"
                    href="https://store.steampowered.com/app/504210/SHENZHEN_IO/"
                >
                    <FontAwesomeIcon icon={faSteam} size="sm" />
                </a>
                <FontAwesomeIcon
                    onClick={() => {
                        setHelpShown((current) => !current);
                    }}
                    icon={faCircleQuestion}
                    title="How to play?"
                    className={styles["showButton"]}
                    size="lg"
                />
            </div>
            <div className={styles["instructionTab"]}>
                {helpShown ? <Instruction /> : null}
            </div>
            <Solitaire />
        </div>
    );
};

export default SolitairePage;

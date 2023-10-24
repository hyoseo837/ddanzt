import { useState } from "react";
import { initializeBoard, moveCard, step, card } from "../games/solitaireGame";
import {
    CardHolder,
    BonusHolder,
    TargetHolder,
} from "../components/CardHolder";
import styles from "../css/solitaire.module.css";
import { prettyDOM } from "@testing-library/react";

const Solitaire = () => {
    // const [mainBoard, setMainBoard] = useState(initializeBoard());
    const [mainBoard, setMainBoard] = useState([
        [new card("a", 1)],
        [new card("b", 1)],
        [new card("c", 1)],
        [new card("a", 2)],
        [new card("b", 2)],
        [new card("a", 3)],
        [],
        [],
        [],
        [],
        [],
    ]);
    const [counter, setCounter] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [completedLst, setCompletedLst] = useState([0, 0, 0]);
    const [isBonus, setIsBonus] = useState(false);

    const onClick = () => {
        // setMainBoard((prev) => moveCard(prev, 0, 1, 8 + counter));
        // while (true) {
        // if (!takeSteps()) {
        //     break;
        // }
        takeSteps();
        console.log(completedLst);
        console.log(completed);
        if (
            completedLst[0] == completed + 1 &&
            completedLst[1] == completed + 1 &&
            completedLst[2] == completed + 1
        ) {
            console.log("aaaa");
            setCompleted((prev) => prev + 1);
        }
        setCounter((prev) => prev + 1);
        // }
    };

    const takeSteps = () => {
        let tmp = step(mainBoard, completed);
        if (tmp[1] == "none") {
            return false;
        }
        if (tmp[1] == "Bonus") {
            setIsBonus(true);
            setMainBoard(tmp[0]);
        } else if (tmp[1] == "a") {
            setCompletedLst((prev) => [prev[0] + 1, prev[1], prev[2]]);
            setMainBoard(tmp[0]);
        } else if (tmp[1] == "b") {
            setCompletedLst((prev) => [prev[0], prev[1] + 1, prev[2]]);
            setMainBoard(tmp[0]);
        } else if (tmp[1] == "c") {
            setCompletedLst((prev) => [prev[0], prev[1], prev[2] + 1]);
            setMainBoard(tmp[0]);
        } else {
            return false;
        }
        return true;
    };

    return (
        <div className={styles["base"]}>
            <div className={styles["bonusHolder"]}>
                <CardHolder cards={mainBoard[8]} />
                <CardHolder cards={mainBoard[9]} />
                <CardHolder cards={mainBoard[10]} />
                <BonusHolder isBonus={isBonus} />
                <TargetHolder shape="a" completedNum={completedLst[0]} />
                <TargetHolder shape="b" completedNum={completedLst[1]} />
                <TargetHolder shape="c" completedNum={completedLst[2]} />
            </div>
            <div className={styles["mainHolder"]}>
                <CardHolder cards={mainBoard[0]} />
                <CardHolder cards={mainBoard[1]} />
                <CardHolder cards={mainBoard[2]} />
                <CardHolder cards={mainBoard[3]} />
                <CardHolder cards={mainBoard[4]} />
                <CardHolder cards={mainBoard[5]} />
                <CardHolder cards={mainBoard[6]} />
                <CardHolder cards={mainBoard[7]} />
            </div>
            <button onClick={onClick}>button</button>
            <span>{counter}</span>
        </div>
    );
};

export default Solitaire;

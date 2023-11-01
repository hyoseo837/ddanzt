import { useState } from "react";
import styles from "../css/solitaire.module.css";
import React from "react";
import {
    initializeBoard,
    isSelectable,
    moveCard,
    collectSpecial,
} from "../games/solitaireGame";
import myReverse from "../functions/myReverse";

const SolitaireBoard = () => {
    const [mainBoard, setMainBoard] = useState(initializeBoard());
    const [completed, setCompleted] = useState(1);
    const [completedLst, setCompletedLst] = useState([0, 0, 0]);
    const [isBonus, setIsBonus] = useState(false);

    const reset = () => {
        setMainBoard(initializeBoard());
    };

    const [selected, setSelected] = useState([-1, 0]);

    const CardHolder = ({ index }) => {
        return (
            <div className={styles["cardHolder"]}>
                {mainBoard[index].length !== 0 ? (
                    myReverse(mainBoard[index]).map((card, i) => (
                        <Card
                            key={i}
                            rowIndex={index}
                            index={mainBoard[index].length - 1 - i}
                            shape={card.shape}
                            number={card.number}
                        />
                    ))
                ) : (
                    <EmptyCard rowIndex={index} />
                )}
            </div>
        );
    };

    const Card = ({ rowIndex, index, shape, number }) => {
        return (
            <div
                className={styles["card"]}
                onClick={() => {
                    if (selected[0] === -1) {
                        if (
                            isSelectable(
                                mainBoard[rowIndex].slice(0, index + 1)
                            )
                        ) {
                            setSelected([rowIndex, index]);
                        }
                    } else {
                        setMainBoard((current) =>
                            moveCard(
                                current,
                                selected[0],
                                selected[1] + 1,
                                rowIndex
                            )
                        );
                        setSelected([-1, 0]);
                    }
                }}
                style={{
                    translate:
                        "0px " +
                        -50 * (mainBoard[rowIndex].length - 1 - index) +
                        "px",
                    boxShadow:
                        selected[0] === rowIndex && selected[1] >= index
                            ? "0 0 10px 3px #FFFF00"
                            : "none",
                }}
            >
                <span>
                    {shape}
                    {number}
                </span>
            </div>
        );
    };

    const EmptyCard = ({ rowIndex }) => {
        return (
            <div
                className={styles["emptyCard"]}
                onClick={() => {
                    if (selected[0] !== -1) {
                        setMainBoard((current) =>
                            moveCard(
                                current,
                                selected[0],
                                selected[1] + 1,
                                rowIndex
                            )
                        );
                        setSelected([-1, 0]);
                    }
                }}
            ></div>
        );
    };

    const BonusHolder = () => {
        return (
            <div className={styles[isBonus ? "bonusCard" : "emptyBonus"]}></div>
        );
    };

    const FinalHolder = ({ shape }) => {
        let shapeIndex = ["a", "b", "c"].indexOf(shape);
        return completedLst[shapeIndex] === 0 ? (
            <div className={styles["emptyCard"]}></div>
        ) : (
            <div
                className={styles["card"]}
                onClick={() => {
                    if (selected[0] !== -1) {
                        setSelected([-1, 0]);
                    }
                }}
            >
                <span>
                    {shape}
                    {completedLst[shapeIndex]}
                </span>
            </div>
        );
    };

    return (
        <div className={styles["base"]}>
            <div className={styles["extraHolder"]}>
                {mainBoard.slice(8, 11).map((holder, i) => (
                    <CardHolder index={8 + i} key={i} />
                ))}
                <div className={styles["specialButtons"]}>
                    <button className={styles["specialButton"]}>x</button>
                    <button className={styles["specialButton"]}>y</button>
                    <button className={styles["specialButton"]}>z</button>
                </div>
                <BonusHolder />
                <FinalHolder shape="a" />
                <FinalHolder shape="b" />
                <FinalHolder shape="c" />
            </div>
            <div className={styles["mainHolder"]}>
                {mainBoard.slice(0, 8).map((holder, i) => (
                    <CardHolder index={i} key={i} />
                ))}
            </div>
            <button onClick={reset}>reset</button>
        </div>
    );
};

export default SolitaireBoard;

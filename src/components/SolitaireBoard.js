import { useEffect, useState } from "react";
import styles from "../css/solitaire.module.css";
import React from "react";
import {
    initializeBoard,
    isSelectable,
    moveCard,
    shownCards,
} from "../games/solitaireGame";
import myReverse from "../functions/myReverse";
// import { animated, useSpring } from "@react-spring/web";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}
const images = importAll(
    require.context("../assets/solitaire", false, /\.(png|jpe?g|svg)$/)
);

const SolitaireBoard = () => {
    const [mainBoard, setMainBoard] = useState(initializeBoard());
    const [completedLst, setCompletedLst] = useState([0, 0, 0]);
    const [isBonus, setIsBonus] = useState(false);
    const [selected, setSelected] = useState([-1, 0]);
    const [isUsable, setIsUsable] = useState([null, null, null]);

    const reset = () => {
        setMainBoard(initializeBoard());
        setIsBonus(false);
        setIsUsable([null, null, null]);
        setSelected([-1, 0]);
        setCompletedLst([0, 0, 0]);
    };

    const isCollectable = (shape) => {
        let tmp = shownCards(mainBoard);
        if (!tmp.slice(8).includes(null)) {
            let foo = false;
            for (let i = 8; i < 11; i++) {
                if (tmp[i].shape == shape) {
                    foo = true;
                }
            }
            if (!foo) {
                return false;
            }
        }
        let counter = 0;
        for (let i = 0; i < tmp.length; i++) {
            const element = tmp[i];
            if (element === null) {
                continue;
            }
            if (element.shape == shape) {
                counter += 1;
            }
        }
        return counter === 4;
    };

    const collect = (shape) => {
        if (isCollectable(shape)) {
            let tmp = mainBoard;
            let foo = shownCards(tmp);
            for (let i = 0; i < tmp.length; i++) {
                if (foo[i] !== null) {
                    if (foo[i].shape === shape) {
                        tmp[i].shift();
                    }
                }
            }
            for (let i = 8; i < 11; i++) {
                if (tmp[i].length === 0 && isUsable[i - 8] === null) {
                    setIsUsable((current) => [
                        ...current.slice(0, i - 8),
                        shape,
                        ...current.slice(i - 7),
                    ]);
                    break;
                }
            }
            setMainBoard(tmp);
        }
    };

    const complete = (cards, shape) => {
        if (cards.length === 1) {
            let card = cards[0];
            if (card.shape === shape) {
                let shapeIndex = ["a", "b", "c"].indexOf(shape);
                if (card.number === completedLst[shapeIndex] + 1) {
                    setCompletedLst((current) => [
                        ...current.slice(0, shapeIndex),
                        current[shapeIndex] + 1,
                        ...current.slice(shapeIndex + 1),
                    ]);
                    return true;
                }
            }
        }
        return false;
    };

    const onComplete = (shape) => {
        if (selected[0] !== -1) {
            if (
                complete(
                    mainBoard[selected[0]].slice(0, selected[1] + 1),
                    shape
                )
            ) {
                setMainBoard((current) => [
                    ...current.slice(0, selected[0]),
                    current[selected[0]].slice(1),
                    ...current.slice(selected[0] + 1),
                ]);
                setSelected([-1, 0]);
            }
        }
    };

    const step = () => {
        console.log("step run");
        let tmp = shownCards(mainBoard);
        for (let i = 0; i < tmp.length; i++) {
            const element = tmp[i];
            if (element !== null) {
                if (element.shape === "bonus") {
                    setIsBonus(true);
                    setMainBoard((current) => [
                        ...current.slice(0, i),
                        current[i].slice(1),
                        ...current.slice(i + 1),
                    ]);
                    break;
                }
                if (
                    element.shape === "a" &&
                    element.number === completedLst[0] + 1 &&
                    element.number <= Math.max(Math.min(...completedLst) + 1, 2)
                ) {
                    complete(mainBoard[i].slice(0, 1), "a");
                    setMainBoard((current) => [
                        ...current.slice(0, i),
                        current[i].slice(1),
                        ...current.slice(i + 1),
                    ]);
                    break;
                }
                if (
                    element.shape === "b" &&
                    element.number === completedLst[1] + 1 &&
                    element.number <= Math.max(Math.min(...completedLst) + 1, 2)
                ) {
                    complete(mainBoard[i].slice(0, 1), "b");
                    setMainBoard((current) => [
                        ...current.slice(0, i),
                        current[i].slice(1),
                        ...current.slice(i + 1),
                    ]);
                    break;
                }
                if (
                    element.shape === "c" &&
                    element.number === completedLst[2] + 1 &&
                    element.number <= Math.max(Math.min(...completedLst) + 1, 2)
                ) {
                    complete(mainBoard[i].slice(0, 1), "c");
                    setMainBoard((current) => [
                        ...current.slice(0, i),
                        current[i].slice(1),
                        ...current.slice(i + 1),
                    ]);
                    break;
                }
            }
        }
    };

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

    const ExtraHolder = ({ index }) => {
        if (isUsable[index - 8] === null) {
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
        } else {
            return (
                <div className={styles["cardHolder"]}>
                    <FakeCard shape={isUsable[index - 8]} />
                </div>
            );
        }
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
                {["x", "y", "z", "bonus"].includes(shape) ? (
                    <img src={images["Card" + shape + ".png"]}></img>
                ) : (
                    <img src={images["Card" + shape + number + ".png"]}></img>
                )}
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
            <div
                className={styles["emptyCard"]}
                onClick={() => {
                    onComplete(shape);
                }}
            ></div>
        ) : (
            <div
                className={styles["card"]}
                onClick={() => {
                    onComplete(shape);
                }}
            >
                <span>
                    {shape}
                    {completedLst[shapeIndex]}
                </span>
            </div>
        );
    };

    const FakeCard = ({ shape }) => {
        return <div className={styles["fakeCard"]}>{shape}</div>;
    };

    useEffect(step, [...mainBoard.map((column) => [...column])]);

    return (
        <div className={styles["base"]}>
            <div className={styles["extraHolder"]}>
                {mainBoard.slice(8, 11).map((holder, i) => (
                    <ExtraHolder index={8 + i} key={i} />
                ))}
                <div className={styles["specialButtons"]}>
                    <button
                        className={styles["specialButton"]}
                        onClick={() => {
                            collect("x");
                        }}
                    >
                        x
                    </button>
                    <button
                        className={styles["specialButton"]}
                        onClick={() => {
                            collect("y");
                        }}
                    >
                        y
                    </button>
                    <button
                        className={styles["specialButton"]}
                        onClick={() => {
                            collect("z");
                        }}
                    >
                        z
                    </button>
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

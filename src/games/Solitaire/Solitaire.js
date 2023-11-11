import { useEffect, useState } from "react";
import styles from "./solitaire.module.css";
import React from "react";
import {
    initializeBoard,
    isSelectable,
    moveCard,
    shownCards,
} from "./solitaireGame";
import myReverse from "../../functions/myReverse";
import { animated, useSpring } from "@react-spring/web";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}
const images = importAll(
    require.context("./asset", false, /\.(png|jpe?g|svg)$/)
);

const Solitaire = () => {
    const [mainBoard, setMainBoard] = useState(initializeBoard());
    const [completedLst, setCompletedLst] = useState([0, 0, 0]);
    const [isBonus, setIsBonus] = useState(false);
    const [selected, setSelected] = useState([-1, 0]);
    const [isUsable, setIsUsable] = useState([null, null, null]);

    const [winCount, setWinCount] = useState(
        JSON.parse(localStorage.getItem("win-count")) || 0
    );
    const [playCount, setPlayCount] = useState(
        JSON.parse(localStorage.getItem("play-count")) || 0
    );
    const [movigCard, setMovingCard] = useState(null);

    useEffect(() => {
        localStorage.setItem("win-count", JSON.stringify(winCount));
    }, [winCount]);
    useEffect(() => {
        localStorage.setItem("play-count", JSON.stringify(playCount));
    }, [playCount]);

    useEffect(() => {
        setPlayCount((current) => current + 1);
        const handleKeyDown = (e) => {
            const key = e.key;
            if (key === "r") {
                reset();
            }
        };
        document.addEventListener("keydown", handleKeyDown, true);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const reset = () => {
        setMainBoard(initializeBoard());
        setIsBonus(false);
        setIsUsable([null, null, null]);
        setSelected([-1, 0]);
        setCompletedLst([0, 0, 0]);
        setMovingCard(null);
        setPlayCount((current) => current + 1);
    };

    const isCollectable = (shape) => {
        let tmp = shownCards(mainBoard);
        if (!tmp.slice(8).includes(null)) {
            let foo = false;
            for (let i = 8; i < 11; i++) {
                if (tmp[i].shape === shape) {
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
            if (element.shape === shape) {
                counter += 1;
            }
        }
        return counter === 4;
    };

    const isSolved = (tmp) => {
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] !== null) {
                return false;
            }
        }
        return true;
    };

    const collect = (shape) => {
        if (movigCard === null) {
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
        if (movigCard === null) {
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
        }
    };

    const congratMessage = async () => {
        setTimeout(() => {
            alert("Cleared!");
            setWinCount((current) => current + 1);
            reset();
        }, 300);
    };

    const manageMoving = async (element, fromPos, toPos) => {
        setMovingCard({
            shape: element.shape,
            number: element.number,
            fromPos: fromPos,
            toPos: toPos,
        });
        setTimeout(() => {
            setMovingCard(null);
        }, 300);
    };

    const step = () => {
        if (movigCard == null) {
            let tmp = shownCards(mainBoard);
            if (isSolved(tmp)) {
                congratMessage();
            }
            for (let i = 0; i < tmp.length; i++) {
                const element = tmp[i];
                if (element !== null) {
                    if (element.shape === "bonus") {
                        setIsBonus(true);
                        manageMoving(
                            element,
                            [8, 9, 10].includes(i)
                                ? [5 + (i - 8) * 80, 5]
                                : [
                                      5 + i * 80,
                                      105 + 40 * (mainBoard[i].length - 1),
                                  ],
                            [320, 5]
                        );
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
                        element.number <=
                            Math.max(Math.min(...completedLst) + 1, 2)
                    ) {
                        complete(mainBoard[i].slice(0, 1), "a");
                        manageMoving(
                            element,
                            [8, 9, 10].includes(i)
                                ? [5 + (i - 8) * 80, 5]
                                : [
                                      5 + i * 80,
                                      105 + 40 * (mainBoard[i].length - 1),
                                  ],
                            [420, 5]
                        );
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
                        element.number <=
                            Math.max(Math.min(...completedLst) + 1, 2)
                    ) {
                        complete(mainBoard[i].slice(0, 1), "b");
                        manageMoving(
                            element,
                            [8, 9, 10].includes(i)
                                ? [5 + (i - 8) * 80, 5]
                                : [
                                      5 + i * 80,
                                      105 + 40 * (mainBoard[i].length - 1),
                                  ],
                            [485, 5]
                        );
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
                        element.number <=
                            Math.max(Math.min(...completedLst) + 1, 2)
                    ) {
                        complete(mainBoard[i].slice(0, 1), "c");
                        manageMoving(
                            element,
                            [8, 9, 10].includes(i)
                                ? [5 + (i - 8) * 80, 5]
                                : [
                                      5 + i * 80,
                                      105 + 40 * (mainBoard[i].length - 1),
                                  ],
                            [550, 5]
                        );
                        setMainBoard((current) => [
                            ...current.slice(0, i),
                            current[i].slice(1),
                            ...current.slice(i + 1),
                        ]);
                        break;
                    }
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
                    if (movigCard === null) {
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
                    }
                }}
                style={{
                    translate:
                        "0px " +
                        -60 * (mainBoard[rowIndex].length - 1 - index) +
                        "px",
                    boxShadow:
                        selected[0] === rowIndex && selected[1] >= index
                            ? "0 0 10px 3px #FFFF00"
                            : "none",
                }}
            >
                {["x", "y", "z", "bonus"].includes(shape) ? (
                    <img
                        className={styles["cardImg"]}
                        src={images["Card" + shape + ".png"]}
                        alt="loading"
                    ></img>
                ) : (
                    <img
                        className={styles["cardImg"]}
                        src={images["Card" + shape + number + ".png"]}
                        alt="loading"
                    ></img>
                )}
            </div>
        );
    };

    const EmptyCard = ({ rowIndex }) => {
        return (
            <div
                className={styles["emptyCard"]}
                onClick={() => {
                    if (movigCard === null) {
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
                    }
                }}
            ></div>
        );
    };

    const BonusHolder = () => {
        return isBonus ? (
            <div className={styles["bonusCard"]}>
                <img
                    className={styles["cardImg"]}
                    src={images["Cardbonus.png"]}
                    alt="loading"
                ></img>
            </div>
        ) : (
            <div className={styles["emptyBonus"]}></div>
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
                <img
                    className={styles["cardImg"]}
                    src={
                        images[
                            "Card" + shape + completedLst[shapeIndex] + ".png"
                        ]
                    }
                    alt="loading"
                ></img>
            </div>
        );
    };

    const FakeCard = ({ shape }) => {
        return (
            <div className={styles["fakeCard"]}>
                <img
                    className={styles["cardImg"]}
                    src={images["Card" + shape + ".png"]}
                    alt="loading"
                ></img>
            </div>
        );
    };

    const MovingCardComponent = ({ shape, number, fromPos, toPos }) => {
        const springs = useSpring({
            from: { x: fromPos[0], y: fromPos[1] },
            to: { x: toPos[0], y: toPos[1] },
            config: {
                tension: 300,
                friction: 30,
            },
        });
        return (
            <animated.div style={{ ...springs }}>
                <div className={styles["movingCard"]}>
                    <img
                        className={styles["movingCardImg"]}
                        src={
                            ["x", "y", "z", "bonus"].includes(shape)
                                ? images["Card" + shape + ".png"]
                                : images["Card" + shape + number + ".png"]
                        }
                        alt="loading"
                    ></img>
                </div>
            </animated.div>
        );
    };

    useEffect(step, [...mainBoard.map((column) => [...column])]);

    return (
        <div className={styles["base"]}>
            <div className={styles["board"]}>
                <div className={styles["extraHolder"]}>
                    {mainBoard.slice(8, 11).map((holder, i) => (
                        <ExtraHolder index={8 + i} key={i} />
                    ))}
                    <div className={styles["specialButtons"]}>
                        <button
                            className={styles["specialButton"]}
                            style={{ backgroundColor: "#ABABAB" }}
                            onClick={() => {
                                collect("x");
                            }}
                        ></button>
                        <button
                            className={styles["specialButton"]}
                            style={{ backgroundColor: "#d7b160" }}
                            onClick={() => {
                                collect("y");
                            }}
                        ></button>
                        <button
                            className={styles["specialButton"]}
                            style={{ backgroundColor: "#AD8256" }}
                            onClick={() => {
                                collect("z");
                            }}
                        ></button>
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
                {movigCard === null ? null : (
                    <MovingCardComponent
                        shape={movigCard.shape}
                        number={movigCard.number}
                        fromPos={movigCard.fromPos}
                        toPos={movigCard.toPos}
                    />
                )}
            </div>
            <div className={styles["utilityBar"]}>
                <button className={styles["resetButton"]} onClick={reset}>
                    reset
                </button>
                <div
                    className={styles["winCount"]}
                    title={
                        "win rate : " +
                        Math.round((100 * winCount) / playCount) +
                        "%"
                    }
                >
                    win : {winCount}
                </div>
            </div>
        </div>
    );
};

export default Solitaire;

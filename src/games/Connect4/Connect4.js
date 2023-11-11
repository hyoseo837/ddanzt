import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styles from "./column.module.css";
import Marvel from "./Marvel";

const Connect4 = () => {
    const Column = ({ index }) => {
        const [{ isOver }, dropRef] = useDrop({
            accept: "marvel",
            drop: (item) => {
                setFunction(index, item);
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        });

        return (
            <React.Fragment>
                <div
                    className={styles["column"]}
                    ref={dropRef}
                    style={{
                        borderWidth: isOver ? "4px" : "2px",
                        display: "flex",
                        flexDirection: "column-reverse",
                    }}
                >
                    {pad[index].map((marvel, i) => (
                        <div
                            className={styles["myMarvel"]}
                            key={i}
                            style={{ backgroundColor: marvel.color }}
                        ></div>
                    ))}
                </div>
            </React.Fragment>
        );
    };

    const [redTurn, setRedTurn] = useState(true);
    const [pad, setPad] = useState([[], [], [], [], [], [], []]);

    const checkWin = (gameBoard) => {
        let tmp = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                tmp[i][j] = gameBoard[i][j].color === "red" ? 1 : 2;
            }
        }
        for (let i = 0; i < 7; i++) {
            let counter = 0;
            for (let j = 0; j < 6; j++) {
                const marvel = tmp[i][j];
                if (marvel === 1) {
                    if (counter < 0) {
                        counter = 0;
                    }
                    counter += 1;
                    if (counter === 4) {
                        return "Red";
                    }
                } else if (marvel === 2) {
                    if (counter > 0) {
                        counter = 0;
                    }
                    counter -= 1;
                    if (counter === -4) {
                        return "Blue";
                    }
                } else {
                    counter = 0;
                }
            }
        }
        for (let j = 0; j < 6; j++) {
            let counter = 0;
            for (let i = 0; i < 7; i++) {
                const marvel = tmp[i][j];
                if (marvel === 1) {
                    if (counter < 0) {
                        counter = 0;
                    }
                    counter += 1;
                    if (counter === 4) {
                        return "Red";
                    }
                } else if (marvel === 2) {
                    if (counter > 0) {
                        counter = 0;
                    }
                    counter -= 1;
                    if (counter === -4) {
                        return "Blue";
                    }
                } else {
                    counter = 0;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                let foo =
                    tmp[i][j] *
                    tmp[i + 1][j + 1] *
                    tmp[i + 2][j + 2] *
                    tmp[i + 3][j + 3];
                if (foo === 1) {
                    return "Red";
                } else if (foo === 16) {
                    return "Blue";
                }
            }
        }
        for (let i = 3; i < 7; i++) {
            for (let j = 0; j < 3; j++) {
                let foo =
                    tmp[i][j] *
                    tmp[i - 1][j + 1] *
                    tmp[i - 2][j + 2] *
                    tmp[i - 3][j + 3];
                if (foo === 1) {
                    return "Red";
                } else if (foo === 16) {
                    return "Blue";
                }
            }
        }
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 6; j++) {
                if (tmp[i][j] === 0) {
                    return "None";
                }
            }
        }
        return "Draw";
    };

    const setFunction = (index, value) => {
        setPad((current) => {
            let tmp = current;
            for (let i = 0; i < current.length; i++) {
                if (i === index) {
                    if (tmp[i].length < 6) {
                        tmp[i] = [...current[i], value];
                        setRedTurn((current) => !current);
                    } else {
                        tmp[i] = current[i];
                    }
                }
            }
            return current;
        });
    };

    const reset = () => {
        setPad([[], [], [], [], [], [], []]);
        setRedTurn(true);
    };

    let tmp = checkWin(pad);
    if (tmp === "Red") {
        alert("RED WIN!!");
        reset();
    } else if (tmp === "Blue") {
        alert("BLUE WIN!!");
        reset();
    } else if (tmp === "Draw") {
        alert("DRAW...");
        reset();
    }

    return (
        <div className={styles["screen"]}>
            <div className={styles["gamePad"]}>
                <Column index={0} />
                <Column index={1} />
                <Column index={2} />
                <Column index={3} />
                <Column index={4} />
                <Column index={5} />
                <Column index={6} />
            </div>
            <div className={styles["marvelBox"]}>
                {redTurn ? <Marvel color={"red"} /> : <Marvel color={"blue"} />}
            </div>
            <button className={styles["resetButton"]} onClick={reset}>
                reset
            </button>
        </div>
    );
};

export default Connect4;

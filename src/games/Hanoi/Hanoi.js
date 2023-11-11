import { useEffect, useState } from "react";
import styles from "./hanoi.module.css";
import Tower from "./Tower";

const Hanoi = () => {
    const [towers, setTowers] = useState([[7, 6, 5, 4, 3, 2, 1], [], []]);
    const [selected, setSelected] = useState(-1);

    const reset = () => {
        setTowers([[7, 6, 5, 4, 3, 2, 1], [], []]);
        setSelected(-1);
    };

    const movePlate = (lst, from, to) => {
        let tmp = lst;
        tmp[to].push(tmp[from].pop());
        return tmp;
    };

    const onClick = (index) => {
        if (selected === -1) {
            if (towers[index].length !== 0) {
                setSelected(index);
            }
        } else {
            if (canPut(selected, index)) {
                setTowers((current) => {
                    return movePlate(current, selected, index);
                });
            }
            setSelected(-1);
        }
    };

    const canPut = (from, to) => {
        if (from === to) {
            return false;
        } else if (towers[to].length === 0) {
            return true;
        } else if (
            towers[to][towers[to].length - 1] >
            towers[from][towers[from].length - 1]
        ) {
            return true;
        } else {
            return false;
        }
    };

    const checkWin = () => {
        if (towers[2].length === 7) {
            return true;
        }
        return false;
    };

    const congratMessage = async () => {
        setTimeout(() => {
            alert("Cleared!");
            reset();
        }, 300);
    };

    useEffect(() => {
        if (checkWin()) {
            congratMessage();
        }
    });

    return (
        <div className={styles["base"]}>
            <div className={styles["screen"]}>
                <div className={styles["towerRow"]}>
                    {towers.map((item, i) => {
                        return (
                            <Tower
                                key={i}
                                plates={item}
                                selected={i === selected}
                                onclick={() => {
                                    onClick(i);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles["utilityBar"]}>
                <button onClick={reset}>reset</button>
            </div>
        </div>
    );
};

export default Hanoi;

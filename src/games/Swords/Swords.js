import { useEffect, useState } from "react";
import styles from "./swords.module.css";
import { getPrice, getProbs, upgrade } from "./swordsGame";

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

const Swords = () => {
    const [swordLv, setSwordLv] = useState(0);
    const [money, setMoney] = useState(500);
    const [failedOpened, setFailedOpened] = useState(false);
    const [inventory, setInventory] = useState(3);

    const reset = () => {
        setSwordLv(0);
        setMoney(500);
        setFailedOpened(false);
        setInventory(3);
    };

    const checkWin = () => {
        if (swordLv === 30) {
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

    const upgradeOnClick = () => {
        if (upgrade(swordLv) === "success") {
            setSwordLv((current) => current + 1);
        } else {
            setFailedOpened(true);
        }
    };

    useEffect(() => {
        if (checkWin()) {
            congratMessage();
        }
    }, [swordLv]);

    const useItem = () => {
        if (inventory > 0) {
            setInventory((current) => current - 1);
            setFailedOpened(false);
        }
    };

    const Stage = () => {
        return (
            <div className={styles["stage"]}>
                <div className={styles["sword"]}>
                    <h1 style={{ marginLeft: "20px" }}>sword +{swordLv}</h1>
                    <img src={images["sword1.png"]} />
                </div>
                <button className={styles["btn-home"]} onClick={upgradeOnClick}>
                    upgrade ({getProbs(swordLv)} %)
                </button>
                <button
                    className={styles["btn-home"]}
                    onClick={() => {
                        setMoney((current) => current + getPrice(swordLv));
                        setSwordLv(0);
                    }}
                >
                    sell
                </button>
            </div>
        );
    };

    const Failed = () => {
        return (
            <div className={styles["failed"]}>
                <div className={styles["sword"]}>
                    <h1 style={{ marginLeft: "20px" }}>sword +{swordLv}</h1>
                    <img
                        src={images["sword1.png"]}
                        style={{ filter: "grayscale(70%)" }}
                    />
                </div>
                <h3> your Sword is broken </h3>
                <button
                    className={styles["btn-home"]}
                    onClick={useItem}
                    disabled={inventory === 0}
                >
                    use item
                </button>
                <button
                    className={styles["btn-home"]}
                    onClick={() => {
                        setSwordLv(0);
                        setFailedOpened(false);
                    }}
                >
                    go to main
                </button>
            </div>
        );
    };

    const Shop = () => {
        return (
            <div className={styles["shop"]}>
                <span
                    style={{
                        fontSize: "20px",
                        padding: "10px",
                        fontWeight: "bolder",
                    }}
                >
                    Shop
                </span>
                <br />
                <button
                    className={styles["btn-home"]}
                    onClick={() => {
                        if (money >= 100) {
                            setMoney((current) => current - 100);
                            setInventory((current) => current + 1);
                        }
                    }}
                >
                    buy item (100 gold)
                </button>
            </div>
        );
    };

    return (
        <div className={styles["base"]}>
            <div className={styles["gameStage"]}>
                <span style={{ float: "right", margin: "10px" }}>
                    Item: {inventory}
                </span>
                <span style={{ float: "right", margin: "10px" }}>
                    Gold: {money}
                </span>
                {failedOpened ? <Failed /> : <Stage />}
                <Shop />
            </div>
            <div className={styles["utilityBar"]}>
                <button onClick={reset}>reset</button>
            </div>
        </div>
    );
};

export default Swords;

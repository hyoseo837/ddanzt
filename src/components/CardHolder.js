import styles from "../css/cardHolder.module.css";

const CardHolder = ({ cards }) => {
    if (cards.length == 0) {
        return (
            <div className={styles["emptyHolder"]}>
                <div className={styles["box"]}></div>
            </div>
        );
    } else {
        return (
            <div className={styles["filledHolder"]}>
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className={styles["eachCard"]}
                        style={{ transform: `translate(0, -${i * 70}%)` }}
                    >
                        <div className={styles["box"]}>
                            <span>
                                {card.shape}
                                {card.number}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};

const BonusHolder = ({ isBonus }) => {
    return (
        <div
            className={
                isBonus
                    ? styles["filledBonusHolder"]
                    : styles["emptyBonusHolder"]
            }
        >
            <div className={styles["box"]}></div>
        </div>
    );
};

const TargetHolder = ({ shape, completedNum }) => {
    if (completedNum == 0) {
        return (
            <div className={styles["emptyHolder"]}>
                <div className={styles["box"]}></div>
            </div>
        );
    } else {
        return (
            <div className={styles["filledHolder"]}>
                <div className={styles["eachCard"]}>
                    <div className={styles["box"]}>
                        <span>
                            {shape}
                            {completedNum}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
};
export { CardHolder, BonusHolder, TargetHolder };

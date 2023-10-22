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

export default CardHolder;

import styles from "./hanoi.module.css";

const rainbow = ["red", "orange", "yellow", "green", "blue", "navy", "violet"];

const Plate = ({ number, glow }) => {
    return (
        <div className={styles["plateBox"]}>
            <div
                className={styles["plate"]}
                style={{
                    width: 20 + number * 20,
                    backgroundColor: rainbow[number - 1],
                    boxShadow: glow ? "0 0 10px 3px #FFFF00" : "none",
                }}
            ></div>
        </div>
    );
};

export default Plate;

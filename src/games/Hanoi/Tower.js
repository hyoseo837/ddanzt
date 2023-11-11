import Plate from "./Plate";
import styles from "./hanoi.module.css";

const Tower = ({ plates, selected, onclick }) => {
    return (
        <div className={styles["tower"]} onClick={onclick}>
            <div className={styles["basePlate"]}></div>
            {plates.map((item, i) => {
                if (selected && i === plates.length - 1) {
                    return <Plate key={i} number={item} glow={true} />;
                } else {
                    return <Plate key={i} number={item} glow={false} />;
                }
            })}
        </div>
    );
};

export default Tower;

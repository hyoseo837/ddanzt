import { useEffect, useState } from "react";
import { initializeBoard, moveCard } from "../games/solitaireGame";
import CardHolder from "../components/CardHolder";
import Card from "../components/Card";
import styles from "../css/solitaire.module.css";

const Solitaire = () => {
    const [deck, setdeck] = useState(moveCard(initializeBoard(), 1, 1, 9));

    return (
        <div>
            <div className={styles["bonusHolder"]}>
                <CardHolder cards={deck[8]} />
                <CardHolder cards={deck[9]} />
                <CardHolder cards={deck[10]} />
            </div>
            <div className={styles["mainHolder"]}>
                <CardHolder cards={deck[0]} />
                <CardHolder cards={deck[1]} />
                <CardHolder cards={deck[2]} />
                <CardHolder cards={deck[3]} />
                <CardHolder cards={deck[4]} />
                <CardHolder cards={deck[5]} />
                <CardHolder cards={deck[6]} />
                <CardHolder cards={deck[7]} />
            </div>
        </div>
    );
};

export default Solitaire;

const Instruction = () => {
    return (
        <div>
            <h3>How to play</h3>
            <p>
                <span style={{ fontWeight: "bold" }}>Goal</span>: to upgrade the
                Sword to lv.30
            </p>
            <span style={{ fontWeight: "bold" }}>Rules</span>
            <ul>
                <li>
                    press upgrade button to upgrade the sword (success rate is
                    described)
                </li>
                <li>press sell button to sell the sword</li>
                <li>
                    price is calculated by 1.4 ^ <i> lv </i> Gold
                </li>
                <li>you can buy item for 100 gold</li>
                <li>if you use item, it recover your broken sword</li>
            </ul>
        </div>
    );
};

export default Instruction;

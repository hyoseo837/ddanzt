const Instruction = () => {
    return (
        <div>
            <h3>How to play</h3>
            <p>
                <span style={{ fontWeight: "bold" }}>Goal</span>: to stack all
                cards of three colors from 1 to 9 on the top right corner and
                gather all the cat cards.
            </p>
            <span style={{ fontWeight: "bold" }}>Rules</span>
            <ul>
                <li>
                    Cards can be stacked on the middle of the board, but only if
                    they are on the card that has different color and plus 1
                    number
                </li>
                <li>
                    3 Bonus holders on the top left corner can hold one card of
                    any type.
                </li>
                <li>
                    If four cats of same color is shown on the top of any stack
                    or holder, they can gather together by consuming one usable
                    bonus holder and pressing the button of correct color.
                </li>
                <li>
                    Mouse card is bonus card so when it came to top of any
                    stack, it run away to the middle of the table itself.
                </li>
                <li>
                    Number cards will automatically stacked to the top right
                    holder if every cards on the board is not smaller than the
                    card. But you can stack the card without any condition.
                </li>
            </ul>
        </div>
    );
};

export default Instruction;

const Instruction = () => {
    return (
        <div>
            <h3>How to play</h3>
            <p>
                <span style={{ fontWeight: "bold" }}>Goal</span>: to move all
                the plates to the right base plate
            </p>
            <span style={{ fontWeight: "bold" }}>Rules</span>
            <ul>
                <li>you only can move one plate at once.</li>
                <li>you cannot put a plate on smaller plate.</li>
                <li>you only can move a plate that is on the top of stacks</li>
            </ul>
        </div>
    );
};

export default Instruction;

const Card = ({ shape, number }) => {
    return (
        <div
            style={{
                width: "40px",
                height: "60px",
                border: "2px solid black",
                textAlign: "center",
            }}
        >
            <h3>
                {number},{shape}
            </h3>
        </div>
    );
};

export default Card;

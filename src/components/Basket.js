import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { PetCard } from "./PetCard";
import "../css/pet.module.css";

const PETS = [
    { id: 1, name: "dog" },
    { id: 2, name: "cat" },
    { id: 3, name: "fish" },
    { id: 4, name: "hamster" },
];

export const Basket = () => {
    const [basket, setBasket] = useState([]);
    const [{ isOver }, dropRef] = useDrop({
        accept: "pet",
        drop: (item) => {
            PETS.splice(PETS.indexOf(item), 1);
            setBasket((prev) => [...prev, item]);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <React.Fragment>
            <div className="pets">
                {PETS.map((pet) => (
                    <PetCard
                        draggable
                        key={pet.id}
                        id={pet.id}
                        name={pet.name}
                    />
                ))}
            </div>
            <div
                className="basket"
                ref={dropRef}
                style={{
                    backgroundColor: "green",
                    width: "100%",
                    height: "100px",
                }}
            >
                {basket.map((pet, i) => (
                    <PetCard key={i} id={pet.id} name={pet.name} />
                ))}
                {isOver && <div>Drop Here!</div>}
            </div>
        </React.Fragment>
    );
};

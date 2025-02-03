import React from "react";
import { SuperheroModel } from "../../../types/api";
import "./HeroCard.scss";

type HeroCardTypes = SuperheroModel & { 
    onDelete: (name: string) => void;
}
const HeroCard: React.FC<HeroCardTypes> = ({ name, powers, onDelete }) => {
  return (
    <article className="hero-card">
      <header className="hero-card__header">
        <span>{name}</span>
        <button aria-label="Delete" onClick={() => onDelete(name)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 2v9h2v-9H8zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2zM9 4V2h6v2h5v2H4V4h5z" />
          </svg>
        </button>
      </header>
      {powers.map((power, index) => (
        <div key={index}>{power}</div>
      ))}
    </article>
  );
};

export default HeroCard;

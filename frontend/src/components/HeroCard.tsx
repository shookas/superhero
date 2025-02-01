import React from "react";
import { SuperheroModel } from "../../../types/api";

const HeroCard: React.FC<SuperheroModel> = ({ name, powers }) => {
  return (
    <article>
      <h2>{name}</h2>
      <ul>
        {powers.map((power, index) => (
          <li key={index}>{power}</li>
        ))}
      </ul>
    </article>
  );
};

export default HeroCard;

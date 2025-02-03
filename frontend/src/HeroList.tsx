import React, { useEffect, useState } from "react";
import { SuperheroModel } from "../../types/api";
import HeroCard from "./components/HeroCard";
import DataLoader from "./services/DataLoader";

const HeroList: React.FC<{ heroListUpdated: number }> = ({
  heroListUpdated,
}) => {
  const loader = new DataLoader();

  const [heroes, setHeroes] = useState<SuperheroModel[]>([]);
  const removeHero = async (name: string) => {
    await loader.deleteHero(name);
    const data = await loader.loadSuperheroes();
    setHeroes(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await loader.loadSuperheroes();
      setHeroes(data);
    };

    fetchData();
  }, [heroListUpdated]);

  return (
    <div className="container">
      {heroes.map((hero, index) => (
        <HeroCard
          key={index}
          name={hero.name}
          powers={hero.powers}
          onDelete={(name) => removeHero(name)}
        />
      ))}
    </div>
  );
};

export default HeroList;

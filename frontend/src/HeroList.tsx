import React, { useEffect, useState } from 'react';
import DataLoader from './services/DataLoader';
import HeroCard from './components/HeroCard';
import { SuperheroModel } from '../../types/api';

const HeroList: React.FC<{heroListUpdated: number}> = ({heroListUpdated}) => {

    const [heroes, setHeroes] = useState<SuperheroModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const loader = new DataLoader();
            const data = await loader.loadSuperheroes();
            setHeroes(data);
        };

        fetchData();
    }, [heroListUpdated]);

    return (
        <div>
            {heroes.map((hero, index) => (
                <HeroCard key={index} name={hero.name} powers={hero.powers} />
            ))}
        </div>
    );
};

export default HeroList;
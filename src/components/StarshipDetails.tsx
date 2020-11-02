import * as React from 'react';
import { StarshipQL } from '../models/Starship';

interface Props{
    starship: StarshipQL
}

const StarshipDetails: React.FC<Props> = ({starship}) => {
    return (
    <pre>{JSON.stringify(starship)}</pre>
    );
};

export default StarshipDetails;
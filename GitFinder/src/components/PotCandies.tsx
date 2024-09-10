import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import CandieCard from './CandieCard';

interface PotCandiesProps {
    potCandie: Candidate[];
    removeFromList:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnPotList: boolean | null | undefined,
        user: string | null
      ) => void)
    | null;
}

const PotCandiesList = ({
    potCandie,
    removeFromList,
}: PotCandiesProps) => {
    console.log(potCandie);
    
return (
    <>
        <ul>
            {potCandie.map((candidate) => (
                <CandieCard
                currentCandie={candidate}
                key={candidate.login}
                onPotCandieList={true}
                removeFromList={removeFromList}
            />
            ))}
        </ul>
    </>
);
};

export default PotCandiesList;
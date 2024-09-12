import type React from 'react';
import { useEffect, useState } from 'react';
import PotCandiesList from "../components/PotCandies";
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [potCandie, setPotCandie] = useState<Candidate[]>([]);

  const removeFromList = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    onCandieList: boolean | null | undefined,
    user: string | null
  ) => {
    e.preventDefault();
    if (onCandieList) {
      let parsedCandies: Candidate[] = [];

      const storedCandies = localStorage.getItem('potCandies');

      if (typeof storedCandies === 'string') {
        parsedCandies = JSON.parse(storedCandies);
      }
      parsedCandies = parsedCandies.filter((candidate) => candidate.login !== user
      );
      localStorage.setItem('potCandies', JSON.stringify(parsedCandies));
    


      parsedCandies = parsedCandies.filter((candidate) => candidate.login !== user
      );

      setPotCandie(parsedCandies);
      localStorage.setItem('alreadyListedCandies', JSON.stringify(parsedCandies)
      );
    }
  };

  useEffect(() => {
    const parsedPotCandie = JSON.parse(localStorage.getItem('potCandies') as string
    );
    setPotCandie(parsedPotCandie);
  }, []);

  return (
    <>
      <h1 className='pageHeader'>Potential Candidates</h1>
      {(!potCandie?.length || potCandie.length === 0) ? (
        <h1 style={{ margin: '16px 0' }}>
          Add Potential Candidates Here.
        </h1>
      ) : (
        <PotCandiesList
          potCandie={potCandie}
          removeFromList={removeFromList}
        />
      )}
    </>
  );
};

export default SavedCandidates;

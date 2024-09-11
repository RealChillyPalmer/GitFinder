import { useState, FormEvent,} from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandieCard from '../components/CandieCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandie, setCurrentCandie] = useState<Candidate>({
    avatar_url: '',
    login: '',
    html_url: '',    
    organizations_url: '',
    repos_url: '',   
  });

  const [searchInput, setSearchInput] = useState<string>('');

  const addToPotCandies = () => {
    let parsedCandies: Candidate[] = [];
    const storedCandies = localStorage.getItem('potCandies');

    if (typeof storedCandies === 'string')
    {
      parsedCandies = JSON.parse(storedCandies);
    }
    parsedCandies.push(currentCandie);
    localStorage.setItem('potCandies', JSON.stringify(parsedCandies));
  };
   const searchForGithubUser = async (event: FormEvent, github_user: string) => {
    event.preventDefault();
     const data: Candidate = await searchGithubUser(event, github_user);
     
    setCurrentCandie(data);
   };

   const randomSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
   const data: Candidate = await searchGithub(); 

   setCurrentCandie(data);
   };

   const noThanks = async () => {
    const data: Candidate = await searchGithub();

    setCurrentCandie(data);
   };
   
   const noPotential = () => {
    alert('This Candidate lacks the Required Potential')
    noThanks();
    
  };


  return (    
    <>
    <h1>Candidate Search</h1>
      <section id='searchSection'>
        <form onSubmit={(event: FormEvent) =>
          searchForGithubUser(event, searchInput)
        }
      >
        <input
          type='text' name='' id='' placeholder='Enter a  Github Username' onChange={(e) => setSearchInput(e.target.value)}
        />
          <button type='submit' id='searchBtn'>
          Search GitHub for this User
          </button>
          <section>
          <button type='button' id='randomBtn' onClick={randomSearch}>
            Random Search
          </button>
          </section>
        </form>
      </section>
      <CandieCard
        currentCandie={currentCandie}
        addToPotCandies={addToPotCandies}
        noPotential={noPotential}
      />
    </>
  )

};

export default CandidateSearch;

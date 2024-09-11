import type React from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import { ImCross } from 'react-icons/im';
import { CgAddR, CgCloseR } from 'react-icons/cg';


type CandieCardProps = {
    currentCandie: Candidate;
    addToPotCandies?: (() => void) | null;
    noPotential?: (() => void) | null;
    onPotCandieList?: boolean | null;
    removeFromList?:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnPotList: boolean | null | undefined,
        user: string | null
    ) => void)
    | null;
};

const CandieCard = ({
    currentCandie,
    addToPotCandies,
    noPotential,
    onPotCandieList,
    removeFromList,
}: CandieCardProps) => {
    return (
        <>
            {currentCandie?.login ? (
                <section className='candieCard'>
                    <figure>
                        <img src={`${currentCandie.avatar_url}`} alt={`${currentCandie.login}`} />
                    </figure>
                    <article className='details'>
                        <h2>{currentCandie.html_url} ( {currentCandie.login} )</h2>
                        <p>
                            <strong>Organizations:</strong> {currentCandie.organizations_url}
                        </p>
                        <p>
                            <strong>Repos:</strong> {currentCandie.repos_url}
                        </p>
                    </article>
                    {onPotCandieList ? (
                        <aside className='icons'>
                            <ImCross
                                style={{ fontSize: '40px', cursor: 'pointer' }}
                                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                                    removeFromList?.(
                                        e,
                                        onPotCandieList,
                                        currentCandie.login
                                    )
                                }
                            />
                        </aside>
                    ) : (
                        <aside className='icons'>
                            <CgAddR id='plusButton'
                                style={{ fontSize: '50px', cursor: 'pointer', margin: '20px 100px' }}
                                onClick={() => addToPotCandies?.()}
                            />
                            <CgCloseR id='xButton'
                                style={{ fontSize: '50px', cursor: 'pointer', margin: '20px  100px' }}
                                onClick={() => noPotential?.()}
                            />
                        </aside>
                    )}
                </section>
            ) : (
                <h1 style={{ margin: '16px 0' }}>Please Search by Username or Random</h1>
            )}
        </>
    );
};


export default CandieCard;
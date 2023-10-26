import CompetitionList from '@/app/components/CompetitionList';
import { getCompetitionsByFederation } from '../../services/competitions';
import { getISODate } from '../../services/dateFunctions';
import Translate from '@/app/services/translateFunction';

export default async function FederationCompetitions({ params }: { params: { bondId: number } }) {
    // get competitions of federation
    const comps: competition[] = await getCompetitionsByFederation(params.bondId, getISODate(-30), getISODate(60))
    // determine unique gameTypes in array
    const gameTypeMap: string[] = new Array;
    comps.forEach((comp: competition) => {
        if (!gameTypeMap.includes(comp.gameType)) {
            gameTypeMap.push(comp.gameType);
        }
    })

    function FilterByGameType(gameType: string) {
        return comps.filter(comp => comp.gameType == gameType);
    }

    return (
        <div>
            <h1>Competities van bondnummer {params.bondId}</h1> <br />
            <div className='flex flex-row'>
                {
                    // add column for each gametype
                    gameTypeMap.map(gameType =>
                        <div key={gameType} className="basis-1/4">
                            <CompetitionList comps={FilterByGameType(gameType)} title={Translate(gameType)} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}


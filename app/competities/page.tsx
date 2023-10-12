import Link from 'next/link';
import { getCompetitionsByFederationId } from '../services/competitions';

type competitie = {
    id: number,
    federationId: number,
    name: string,
    gameType: string,
    startDate: Date,
    endDate: Date,
}

export default async function FederationCompetitions() {
    const comps = await getCompetitionsByFederationId()
    console.log(comps)
    return (
        <ul>
            {
                comps.map(function (comp: competitie) {
                    return (
                        <li>
                            <Link href={`/competities/${comp.id}`}>{comp.name}</Link>
                        </li>
                    )
                })
            }
        </ul>
    );
}


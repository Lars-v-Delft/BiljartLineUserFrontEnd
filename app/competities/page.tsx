type competitie = {
    id: number,
    federationId: number,
    name: string,
    gameType: string,
    startDate: Date,
    endDate: Date,
}

import { getCompetitionsByFederationId } from '../services/competitions';

export default async function CompetitiesPage() {
    const comps = await getCompetitionsByFederationId()
    console.log(comps)
    return (
        <div>
            {
                comps.map(function (comp: competitie) {
                    return (
                        <p key={comp.id}>
                            {comp.name}
                        </p>
                    )
                })
            }
        </div>
    );
}


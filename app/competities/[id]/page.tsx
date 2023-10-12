import { getTeamsByCompetitionId } from "@/app/services/teams"

type team = {
    id: number,
    competitionId: number,
    name: string,
    dayOfWeek: Date,
    timesViewed: number
}

export default async function CompetitionTeams({ params }: { params: { id: number } }) {
    const teams = await getTeamsByCompetitionId(params.id)
    return (
        <div>
            <h1>Dit zijn de teams in competitie {params.id}</h1>
            {
                teams.map(function (team: team) {
                    return <h1>{team.name}</h1>
                })
            }
        </div>
    )
}

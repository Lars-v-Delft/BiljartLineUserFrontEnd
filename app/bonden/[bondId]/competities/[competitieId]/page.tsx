import TeamList from "@/app/components/TeamList";
import { getCompetition } from "@/app/services/competitions"
import { getTeamsByCompetition } from "@/app/services/teams"

export default async function CompetitionTeams({ params }: { params: { competitieId: number } }) {
    let competitionPromise = getCompetition(params.competitieId).catch(() => null);
    let teamsPromise = getTeamsByCompetition(params.competitieId).catch(() => null);

    const [competition, teams] = await Promise.all([competitionPromise, teamsPromise]);
    return (
        <div>
            {competition === null ?
                <h1 className="bg-red-100 text-red-500 p-4 rounded">Competitie informatie kan niet geladen worden</h1> :
                <h1>Teams in competitie {competition.name}</h1>
            }
            <br />
            {teams === null ?
                <h1 className="bg-red-100 text-red-500 p-4 rounded">Teams in competitie kunnen niet geladen worden</h1> :
                <TeamList teams={teams} />
            }
        </div>
    )
}

import TeamList from "@/app/components/TeamList";
import { getCompetition } from "@/app/services/competitions"
import { getTeamsByCompetitionId } from "@/app/services/teams"

export default async function CompetitionTeams({ params }: { params: { competitieId: number } }) {
    const comp: competition = await getCompetition(params.competitieId);
    const teams: team[] = await getTeamsByCompetitionId(params.competitieId);
    return (
        <div>
            <h1>Teams in competitie {comp.name}</h1> <br />
            <TeamList teams={teams} />
        </div>
    )
}

import TeamList from "@/app/components/TeamList";
import { getCompetition } from "@/app/services/competitions"
import { getTeamsByCompetition } from "@/app/services/teams"
import { Suspense } from "react";

export default async function CompetitionTeams({ params }: { params: { competitieId: number } }) {
    let competitionPromise = getCompetition(params.competitieId);
    let teamsPromise = getTeamsByCompetition(params.competitieId);

    async function displayCompetitionName() {
        try {
            const competition = await competitionPromise;
            return <h1>Teams in competitie {competition.name}</h1>;
        } catch {
            return <h1 className="bg-red-100 text-red-500 p-4 rounded">Competitie informatie kan niet geladen worden</h1>;
        }
    }

    return (
        <div>
            <Suspense fallback={<p>Competitie laden...</p>}>
                {displayCompetitionName()}
            </Suspense>
            <br />
            <Suspense fallback={<p>Teams laden...</p>}>
                <TeamList promise={teamsPromise} />
            </Suspense>
        </div>
    )
}

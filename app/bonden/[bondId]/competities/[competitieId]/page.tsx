import TeamList from "@/app/components/TeamList";
import { getCompetition } from "@/app/services/competitions"
import Link from "next/link";
import { Suspense } from "react";

export default async function CompetitionTeams({ params }: { params: { competitieId: number } }) {
    let competitionPromise = getCompetition(params.competitieId);

    return (
        <div>
            <Suspense fallback={<p>Competitie laden...</p>}>
                <CompetitionNameText competitionPromise={competitionPromise} />
            </Suspense>
            <br />
            <Link href={`${params.competitieId}/teams/toevoegen`}>Team toevoegen</Link>
            <Suspense fallback={<p>Teams laden...</p>}>
                <TeamList competitionId={params.competitieId} />
            </Suspense>
        </div>
    )
}


async function CompetitionNameText({ competitionPromise }: { competitionPromise: Promise<competition> }) {
    try {
        const competition = await competitionPromise;
        return <h1>Teams in competitie {competition.name}</h1>;
    } catch {
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">Competitie informatie kan niet geladen worden</h1>;
    }
}
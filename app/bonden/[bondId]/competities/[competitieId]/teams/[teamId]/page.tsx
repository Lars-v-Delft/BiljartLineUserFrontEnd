import PlayerList from "@/app/components/PlayerList";
import { getTeam, incrementViewCount } from "@/app/services/teams";
import weekdayFunction from "@/app/services/weekdayFunction";

export default function teamPage({ params }: { params: { teamId: number } }) {
    let teamPromise = getTeam(params.teamId);
    incrementViewCount(params.teamId);
    return (
        <div>
            <TeamInfo teamPromise={teamPromise} />
            <PlayerList teamId={params.teamId} />
        </div>
    )
}

async function TeamInfo({ teamPromise }: { teamPromise: Promise<team> }) {
    try {
        const team = await teamPromise;
        return <div>
            <h1>Team: {team.name}</h1>
            <h1>Thuisspeeldag: {weekdayFunction(team.homeGameDay)}</h1>
            <h1>Aantal keer bekeken: {team.timesViewed}</h1>
        </div>
    } catch {
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">Competitie informatie kan niet geladen worden</h1>;
    }
}
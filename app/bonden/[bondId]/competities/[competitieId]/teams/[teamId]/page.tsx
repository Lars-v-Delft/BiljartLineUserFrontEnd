import { options } from "@/app/api/auth/[...nextauth]/options";
import PlayerList from "@/app/components/PlayerList";
import { getTeam, incrementViewCount } from "@/app/services/teams";
import weekdayFunction from "@/app/services/weekdayFunction";
import { AuthOptions, getServerSession } from "next-auth";

export default async function teamPage({ params }: { params: { teamId: number } }) {
    const session = await getServerSession(options as AuthOptions);
    if (session != null) {
        const jwt = (session as any).accessToken;
        incrementViewCount(params.teamId, jwt);
    }

    let teamPromise = getTeam(params.teamId);
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
            {/* <Increment teamId={team.id} /> */}
        </div>
    } catch {
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">Competitie informatie kan niet geladen worden</h1>;
    }
}
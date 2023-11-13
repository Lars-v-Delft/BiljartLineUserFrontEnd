import EditTeam from "@/app/components/EditTeam";
import { getTeam } from "@/app/services/teams";

export default async function teamEditPage({ params }: { params: { teamId: number } }) {
    try {
        const team: team = await getTeam(params.teamId);
        return (
            <EditTeam team={team} />
        )
    } catch {
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">Team kan niet geladen worden</h1>
    }
}
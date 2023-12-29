import EditTeam from "@/app/components/EditTeam";
import { getTeam } from "@/app/services/teams";
import { AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function teamEditPage({ params }: { params: { bondId: number, competitieId: number, teamId: number } }) {
    const session = await getServerSession();
    if (!session)
        redirect(`/api/auth/signin?callbackUrl=/bonden/${params.bondId}/competities/${params.competitieId}/teams/${params.teamId}/aanpassen`);

    try {
        const team: team = await getTeam(params.teamId);
        return (
            <EditTeam team={team} />
        )
    } catch {
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">Team kan niet geladen worden</h1>
    }
}
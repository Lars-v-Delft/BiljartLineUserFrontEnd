import AddTeam from "@/app/components/AddTeam";
import { AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function addTeamPage({ params }: { params: { bondId: number, competitieId: number } }) {
    const session = await getServerSession();
    if (!session)
        redirect(`/api/auth/signin?callbackUrl=/bonden/${params.bondId}/competities/${params.competitieId}/teams/toevoegen`);
    return (
        <AddTeam competitionId={params.competitieId} />
    )
}

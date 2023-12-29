import EditCompetition from "@/app/components/EditCompetition";
import { getCompetition } from "@/app/services/competitions";
import { AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function editCompitition({ params }: { params: { bondId: number, competitieId: number } }) {
    const session = await getServerSession();
    if (!session)
        redirect(`/api/auth/signin?callbackUrl=/bonden/${params.bondId}/competities/${params.competitieId}/aanpassen`);

    try {
        const competition = await getCompetition(params.competitieId);
        return (
            <EditCompetition competition={competition} />
        )
    } catch {
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">competitie kan niet geladen worden</h1>
    }
}
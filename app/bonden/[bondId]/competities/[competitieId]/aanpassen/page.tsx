import EditCompetition from "@/app/components/EditCompetition";
import { getCompetition } from "@/app/services/competitions";

export default async function editCompitition({ params }: { params: { competitieId: number } }) {
    try {
        const competition = await getCompetition(params.competitieId);
        return (
            <EditCompetition competition={competition} />
        )
    } catch {
        return <h1 className="bg-red-100 text-red-500 p-4 rounded">competitie kan niet geladen worden</h1>
    }
}
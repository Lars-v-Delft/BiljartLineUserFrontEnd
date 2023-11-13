import AddTeam from "@/app/components/AddTeam";

export default function addTeamPage({ params }: { params: { competitieId: number } }) {
    return (
        <AddTeam competitionId={params.competitieId} />
    )
}

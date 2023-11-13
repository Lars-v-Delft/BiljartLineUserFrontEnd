import AddCompetition from "@/app/components/AddCompetition";

export default async function addCompitition({ params }: { params: { bondId: number } }) {
    return (
        <AddCompetition federationId={params.bondId} />
    )
}
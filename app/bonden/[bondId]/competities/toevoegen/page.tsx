import AddCompetition from "@/app/components/AddCompetition";
import { AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function addCompitition({ params }: { params: { bondId: number } }) {
    const session = await getServerSession();
    if (!session)
        redirect(`/api/auth/signin?callbackUrl=/bonden/${params.bondId}/competities/toevoegen`);
    return (
        <AddCompetition federationId={params.bondId} />
    )
}
import { options } from "@/app/api/auth/[...nextauth]/options";
import AddCompetition from "@/app/components/AddCompetition";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function addCompitition({ params }: { params: { bondId: number } }) {
    const session = await getServerSession(options);
    if (!session)
        redirect(`/api/auth/signin?callbackUrl=/bonden/${params.bondId}/competities/toevoegen`);

    return (
        <AddCompetition federationId={params.bondId} />
    )
}
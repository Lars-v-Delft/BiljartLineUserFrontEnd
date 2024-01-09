import CompetitionListsByGameType from '@/app/components/CompetitionListsByGameType';
import { getCompetitionsByFederation } from '@/app/services/competitions';
import { getCurrentFormattedDateString } from '@/app/services/dateFunctions';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { getServerSession } from 'next-auth';

export default async function FederationCompetitions({ params }: { params: { bondId: number } }) {
    const competitionsPromise = getCompetitionsByFederation(params.bondId, getCurrentFormattedDateString(-30), getCurrentFormattedDateString(60), false);
    const session = await getServerSession();
    return (
        <div>
            {session ?
                <Button
                    as={Link}
                    href={`${params.bondId}/competities/toevoegen`}
                    color="success"
                    variant="ghost"
                    radius='full'
                    size='lg'
                > Competitie toevoegen
                </Button> : <></>}
            <br /> <br />
            <CompetitionListsByGameType competitionsPromise={competitionsPromise} />
        </div>
    )
}


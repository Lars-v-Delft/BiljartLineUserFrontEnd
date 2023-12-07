import CompetitionListsByGameType from '@/app/components/CompetitionListsByGameType';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default async function FederationCompetitions({ params }: { params: { bondId: number } }) {
    return (
        <div>
            <Button
                as={Link}
                href={`${params.bondId}/competities/toevoegen`}
                color="success"
                variant="ghost"
                radius='full'
                size='lg'
            >
                Competitie toevoegen
            </Button>
            <br /> <br />
            <CompetitionListsByGameType bondId={params.bondId} />
        </div>
    )
}


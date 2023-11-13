import Link from 'next/link';
import CompetitionListsByGameType from '@/app/components/CompetitionListsByGameType';

export default async function FederationCompetitions({ params }: { params: { bondId: number } }) {


    return (
        <div>
            <h1>Competities van bondnummer {params.bondId}</h1>
            <Link href={`${params.bondId}/competities/toevoegen`}>Competitie toevoegen</Link>
            <br /> <br />
            <CompetitionListsByGameType bondId={params.bondId} />
        </div>
    )
}


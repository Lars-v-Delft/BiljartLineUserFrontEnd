'use client'
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { deleteCompetition } from "../services/competitions";
import { competition } from "../types/competition";
import { useSession } from "next-auth/react";

export default function CompetitionList({ comps, title }: { comps: competition[], title: string }) {
    const { data } = useSession();
    const [competitions, setCompetitions] = useState<competition[]>([]);

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        setCompetitions(comps);
    }, [])

    async function handleRemoveItem(itemID: number) {
        try {
            await deleteCompetition(itemID);
            setCompetitions(competitions.filter(comp => comp.id != itemID));
            setSuccessMessage('Competitie verwijderd');
            setErrorMessage('');
        } catch (error: any) {
            setSuccessMessage('');
            setErrorMessage('Error bij het verwijderen van de competitie');
        }
    };

    return (
        <div>
            <ul className="mx-2 border rounded-lg border-gray-600">
                <li className="text-center text-lg font-semibold py-2 bg-gray-700 text-white  rounded-t-lg">{title}</li>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {competitions.map(comp =>
                    <li key={comp.id} className="px-4 py-2 border-t border-gray-600">
                        <Link href={`${comp.federationId}/competities/${comp.id}`} color="primary" size="lg">{comp.name}</Link>
                        <p className="text-sm font-normal mb-2">{comp.startDate.toLocaleDateString()}</p>

                        {data ? <>
                            <Button
                                as={Link}
                                href={`${comp.federationId}/competities/${comp.id}/aanpassen`}
                                color="secondary"
                                variant="ghost"
                                radius='sm'
                            >Aanpassen</Button>
                            <Button
                                color="danger"
                                variant="ghost"
                                radius='sm'
                                onPress={() => handleRemoveItem(comp.id)}
                            >Verwijder</Button>
                        </> : <></>}
                    </li>
                )}
            </ul>
        </div>
    )
}
'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteCompetition } from "../services/competitions";

export default function CompetitionList({ comps, title }: { comps: competition[], title: string }) {
    const [competitions, setCompetitions] = useState<competition[]>([]);

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        setCompetitions(comps);
    }, [])

    async function handleRemoveItem(e: any) {
        try {
            const itemID = e.target.getAttribute("itemID")
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
                        <Link className="text-purple-950 font-medium underline" href={`${comp.federationId}/competities/${comp.id}`}>{comp.name}</Link> <br />
                        <p className="text-sm font-normal">{comp.startDate.toLocaleDateString()}</p>
                        <Link href={`${comp.federationId}/competities/${comp.id}/aanpassen`}>Aanpassen</Link> <br />
                        <button itemID={comp.id.toString()} onClick={handleRemoveItem}>Verwijder</button>
                    </li>
                )}
            </ul>
        </div>
    )
}
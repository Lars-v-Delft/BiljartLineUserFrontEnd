'use client'
import Link from "next/link";
import { deleteTeam, getTeamsByCompetition } from "../services/teams";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function TeamList({ competitionId }: { competitionId: number }) {
    const { data } = useSession();
    const [teams, setTeams] = useState<team[]>([]);
    const [error, setError] = useState('');

    async function fetchData() {
        try {
            setTeams(await getTeamsByCompetition(competitionId));
            setError('');
        } catch {
            setError('Teams kunnen niet geladen worden');
        }
    }

    async function handleRemoveItem(e: any) {
        try {
            const itemID = e.target.getAttribute("itemID")
            await deleteTeam(itemID);
            setTeams(teams.filter(team => team.id != itemID));
        } catch {
            setError('Error. Team kan niet verwijderd worden');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="w-full text-left">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                    <th scope="col" className="px-3 py-3">
                        Team
                    </th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {error.length > 0 ?
                    <tr><td className="bg-red-100 text-red-500 p-4">{error}</td></tr> : null
                }
                {teams.map((team, index) =>
                    <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} border-b`} key={team.id}>
                        <td scope="row" className="px-3 py-2 font-medium text-gray-900">
                            <Link href={`${competitionId}/teams/${team.id}`}>{team.name}</Link>
                            {data ?
                                <> <Link className="px-3" href={`${competitionId}/teams/${team.id}/aanpassen`}>Aanpassen</Link>
                                    <button itemID={team.id.toString()} onClick={handleRemoveItem}>Verwijder</button>
                                </> : <></>}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}


'use client';
import { useEffect, useState } from "react";
import { getPlayersByTeam } from "../services/players";

export default function PlayerList({ teamId }: { teamId: number }) {
    const [players, setPlayers] = useState<player[]>([]);
    const [error, setError] = useState('');

    async function fetchData() {
        try {
            setPlayers(await getPlayersByTeam(teamId));
            setError('');
        } catch {
            setError('Spelers kunnen niet geladen worden');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ul>
            {error.length > 0 ?
                <li className="bg-red-100 text-red-500 p-4">{error}</li> :
                <li>Spelers:</li>
            }
            {players?.map((player) => (
                <li key={player.id}>{player.name}</li>
            ))}
        </ul>
    )
}

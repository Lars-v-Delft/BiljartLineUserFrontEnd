'use client'
import { useState, ChangeEvent, useEffect } from 'react';
import { editTeam } from '../services/teams';
import { getPlayers } from '../services/players';

export default function EditTeam({ team }: { team: team }) {
    const [teamData, setTeamData] = useState<team>({
        id: team.id,
        competitionId: team.competitionId,
        playerIds: team.playerIds,
        name: team.name,
        homeGameDay: team.homeGameDay,
        timesViewed: team.timesViewed,
    });

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [players, setPlayers] = useState<player[]>([]);

    useEffect(() => {
        async function getData() {
            try {
                setPlayers(await getPlayers());
            } catch {
                setSuccessMessage('');
                setErrorMessage('Error bij laden van spelers');
            }
        }
        getData();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "playerIds") {
            const selectedOptions = Array.from(
                (e.target as HTMLSelectElement).selectedOptions
            ).map((option) => option.value);

            setTeamData({
                ...teamData,
                [name]: selectedOptions.map(Number),
            });
        } else {
            setTeamData({
                ...teamData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editTeam(teamData);
            setSuccessMessage('Team aangepast!');
            setErrorMessage('');

        } catch (error: any) {
            setSuccessMessage('');
            setErrorMessage('Error bij aanpassen van team');
        }
    };

    return (
        <div>
            <h1>Team aanpassen</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>Id
                    <input
                        type="number"
                        name='id'
                        value={teamData.id}
                        disabled
                    />
                </label>
                <br />
                <label>Competitienummer:
                    <input
                        type="number"
                        name='competitionId'
                        value={teamData.competitionId}
                        disabled
                    />
                </label>
                <br />
                <label>Naam:
                    <input
                        type="text"
                        name="name"
                        value={teamData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>Thuisspeeldag:
                    <select
                        name='homeGameDay'
                        value={teamData.homeGameDay}
                        onChange={handleInputChange}
                    >
                        <option value='1'>Maandag</option>
                        <option value='2'>Dinsdag</option>
                        <option value='3'>Woensdag</option>
                        <option value='4'>Donderdag</option>
                        <option value='5'>Vrijdag</option>
                        <option value='6'>Zaterdag</option>
                        <option value='7'>Zondag</option>
                    </select>
                </label>
                <br />
                <label>Aantal keer bekeken:
                    <input
                        type="number"
                        name='timesViewed'
                        value={teamData.timesViewed}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>Spelers <br />
                    <select
                        name="playerIds"
                        value={teamData.playerIds.toString()}
                        onChange={handleInputChange}
                        multiple={true}
                    >
                        {players.map((player) => (
                            <option key={player.id} value={player.id}>{player.name}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Aanpassen</button>
            </form>
        </div>
    );
}
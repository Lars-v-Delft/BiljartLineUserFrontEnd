'use client'
import { useState, ChangeEvent } from 'react';
import { editCompetition } from '../services/competitions';

export default function editCompitition({ competition }: { competition: competition }) {
    const [competitionData, setCompetitionData] = useState<competition>({
        id: competition.id,
        federationId: competition.federationId,
        name: competition.name,
        teamIds: competition.teamIds,
        gameType: competition.gameType,
        startDate: competition.startDate,
        endDate: competition.endDate,
        published: competition.published,
    });

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Convert date input values to Date objects
        if (name === 'startDate' || name === 'endDate') {
            setCompetitionData({
                ...competitionData,
                [name]: new Date(value),
            });
        } else {
            setCompetitionData({
                ...competitionData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editCompetition(competitionData);
            setSuccessMessage('Competitie aangepast!');
            setErrorMessage('');

        } catch (error: any) {
            setSuccessMessage('');
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Competitie aanpassen</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>Id
                    <input
                        type="number"
                        name='id'
                        value={competitionData.id}
                        disabled
                    />
                </label>
                <br />
                <label>Bondnummer:
                    <input
                        type="number"
                        name='federationId'
                        value={competitionData.federationId}
                        disabled
                    />
                </label>
                <br />
                <label>Naam:
                    <input
                        type="text"
                        name="name"
                        value={competitionData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>Spelvorm:
                    <select
                        name='gameType'
                        value={competitionData.gameType}
                        onChange={handleInputChange}
                    >
                        <option value='STRAIGHT_RAIL'>Libre</option>
                        <option value='BALKLINE'>Kaderspelen</option>
                        <option value='ONE_CUSHION'>Bandstoten</option>
                        <option value='THREE_CUSHION'>Driebanden</option>
                    </select>
                </label>
                <br />
                <label>Startdatum:
                    <input
                        type="date"
                        name='startDate'
                        value={competitionData.startDate.toISOString().split('T')[0]}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>Einddatum:
                    <input
                        type="date"
                        name='endDate'
                        value={competitionData.endDate.toISOString().split('T')[0]}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Aanpassen</button>
            </form>
        </div>
    );
}
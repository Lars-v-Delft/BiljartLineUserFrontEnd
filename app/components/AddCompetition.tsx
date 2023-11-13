'use client'
import { useState, ChangeEvent } from 'react';
import { postCompetition } from '../services/competitions';

export default function addCompitition({ federationId }: { federationId: number }) {
    const [competitionData, setCompetitionData] = useState<newCompetition>({
        federationId: federationId,
        name: '',
        gameType: 'STRAIGHT_RAIL',
        startDate: new Date(),
        endDate: new Date(),
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
            await postCompetition(competitionData);
            setSuccessMessage('Competitie toegevoegd!');
            setErrorMessage('');
        } catch (error: any) {
            setSuccessMessage('');
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Competitie toevoegen</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>Bondnummer:
                    <input
                        type="number"
                        name='federationId'
                        value={competitionData.federationId}
                        onChange={handleInputChange}
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
                <button type="submit">Toevoegen</button>
            </form>
        </div>
    );
}
'use client'
import { useState, ChangeEvent, useEffect } from 'react';
import { postCompetition } from '../services/competitions';
import { Input, Select, SelectItem, Button } from "@nextui-org/react";

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

    const [name, setName] = useState<string>();
    const [gameType, setGameType] = useState<string>();
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    useEffect(() => {
        console.log('name: ', name);
        console.log('gameType: ', gameType);
        console.log('startDate: ', startDate);
        console.log('endDate: ', endDate);
    }, [name, gameType, startDate, endDate]);

    return (
        <div>
            <h1>Competitie toevoegen</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    isDisabled
                    type="number"
                    label="Bondnummer"
                    value={competitionData.federationId.toString()}
                    className="max-w-xs"
                />
                <Input
                    // minLength={5}
                    // maxLength={50}
                    // errorMessage="Minimaal 5 en maximaal 50 karakters"
                    isRequired
                    type="text"
                    label="Naam"
                    onValueChange={setName}
                    className="max-w-xs" />
                <Select
                    isRequired
                    label="Spelvorm"
                    placeholder="Selecteer een spelvorm"
                    onChange={(e) => setGameType(e.target.value)}
                    className="max-w-xs"
                >
                    <SelectItem key='STRAIGHT_RAIL' value='STRAIGHT_RAIL'> Libre</SelectItem>
                    <SelectItem key='BALKLINE' value='BALKLINE'> Kaderspelen</SelectItem>
                    <SelectItem key='ONE_CUSHION' value='ONE_CUSHION'> Bandstoten</SelectItem>
                    <SelectItem key='THREE_CUSHION' value='THREE_CUSHION'> Driebanden</SelectItem>
                </Select>
                <Input
                    isRequired
                    type="date"
                    label="Startdatum"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small"></span>
                        </div>
                    }
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    className="max-w-xs" />
                <Input
                    isRequired
                    type="date"
                    label="Einddatum"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small"></span>
                        </div>
                    }
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    className="max-w-xs" />
                <Button type="submit" color="primary">Toevoegen</Button>
            </form>
            <br /><br /><br />
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
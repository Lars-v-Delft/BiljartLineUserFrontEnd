'use client'
import { useState, ChangeEvent } from 'react';
import { editCompetition } from '../services/competitions';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { validCompetitionName, competition, validCompetitionEndDate } from '../types/competition';
import { getFormattedDateString } from '../services/dateFunctions';

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
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(competitionData)
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
        console.log(competitionData)
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await editCompetition(competitionData);
            router.push('/bonden/1');
        } catch (error: any) {
            setErrorMessage('Fout bij aanpassen van competitie');
        }
    };

    return (
        <div>
            <h2 className='text-lg font-bold uppercase'>Competitie aanpassen</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    isDisabled
                    type="number"
                    label="Competitienummer"
                    value={competitionData.id.toString()}
                    className="max-w-xs my-2"
                />
                <Input
                    isDisabled
                    type="number"
                    label="Bondnummer"
                    value={competitionData.federationId.toString()}
                    className="max-w-xs my-2"
                />
                <Input
                    isRequired
                    type="text"
                    name='name'
                    label="Naam"
                    value={competitionData.name}
                    isInvalid={!validCompetitionName(competitionData.name)}
                    errorMessage={!validCompetitionName(competitionData.name) && "Minimaal 5 en maximaal 50 karakters"}
                    onChange={handleInputChange}
                    className="max-w-xs my-2" />
                <Select
                    isRequired
                    name='gameType'
                    label="Spelvorm"
                    defaultSelectedKeys={[competitionData.gameType]}
                    placeholder="Selecteer een spelvorm"
                    onChange={handleInputChange}
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
                    name='startDate'
                    label="Startdatum"
                    value={getFormattedDateString(competitionData.startDate)}
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small"></span>
                        </div>
                    }
                    onChange={handleInputChange}
                    className="max-w-xs my-2" />
                <Input
                    isRequired
                    type="date"
                    name='endDate'
                    label="Einddatum"
                    value={getFormattedDateString(competitionData.endDate)}
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small"></span>
                        </div>
                    }
                    isInvalid={!validCompetitionEndDate(competitionData.startDate, competitionData.endDate)}
                    errorMessage={
                        !validCompetitionEndDate(competitionData.startDate, competitionData.endDate)
                        && "Einddatum kan niet voor startdatum liggen"}
                    onChange={handleInputChange}
                    className="max-w-xs my-2" />
                <Button type="submit" color="primary">Aanpassen</Button>
            </form>
        </div>
    );
}
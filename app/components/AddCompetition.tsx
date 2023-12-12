'use client'
import { useState, useMemo } from 'react';
import { postCompetition } from '../services/competitions';
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function addCompitition({ federationId }: { federationId: number }) {
    const [name, setName] = useState<string>("");
    const [gameType, setGameType] = useState<string>("STRAIGHT_RAIL");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const newCompetition: newCompetition = {
                federationId: federationId,
                name: name,
                gameType: gameType,
                startDate: startDate,
                endDate: endDate,
            };
            await postCompetition(newCompetition);
            router.push('/bonden/1');
        } catch (error: any) {
            setSuccessMessage('');
            setErrorMessage('Fout bij toevoegen van competitie');
        }
    };

    function validName(): boolean {
        const isValid: boolean = useMemo(() => {
            const regexp = new RegExp('.{5,50}');
            return regexp.test(name);
        }, [name]);
        console.log('name: ', isValid);
        return isValid;
    }

    function validEndDate(): boolean {
        const isValid: boolean = useMemo(() => {
            return endDate >= startDate;
        }, [endDate, startDate]);
        console.log('end: ', isValid);
        return isValid;
    }

    return (
        <div>
            <h2 className='text-lg font-bold uppercase'>Competitie toevoegen</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <Input
                    isDisabled
                    type="number"
                    label="Bondnummer"
                    value={federationId.toString()}
                    className="max-w-xs my-2"
                />
                <Input
                    isRequired
                    type="text"
                    label="Naam"
                    isInvalid={!validName()}
                    errorMessage={!validName() && "Minimaal 5 en maximaal 50 karakters"}
                    onValueChange={setName}
                    className="max-w-xs my-2" />
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
                    className="max-w-xs my-2" />
                <Input
                    isRequired
                    type="date"
                    label="Einddatum"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small"></span>
                        </div>
                    }
                    isInvalid={!validEndDate()}
                    errorMessage={!validEndDate() && "Einddatum kan niet voor startdatum liggen"}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    className="max-w-xs my-2" />
                <Button type="submit" color="primary">Toevoegen</Button>
            </form>
        </div>
    );
}
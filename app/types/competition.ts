import { useMemo } from "react"

export type competition = {
    id: number,
    federationId: number,
    name: string,
    teamIds: number[],
    gameType: string,
    startDate: Date,
    endDate: Date,
    published: boolean
}

export type newCompetition = {
    federationId: number,
    name: string,
    gameType: string,
    startDate: Date,
    endDate: Date,
}

export type formattedNewCompetition = {
    federationId: number,
    name: string,
    gameType: string,
    startDate: string,
    endDate: string,
}

export type formattedCompetition = {
    id: number,
    federationId: number,
    name: string,
    teamIds: number[],
    gameType: string,
    startDate: string,
    endDate: string,
    published: boolean
}

export function validCompetitionName(name: string): boolean {
    const isValid: boolean = useMemo(() => {
        const regexp = new RegExp('.{5,50}');
        return regexp.test(name);
    }, [name]);
    return isValid;
}

export function validCompetitionEndDate(startDate: Date, endDate: Date): boolean {
    const isValid: boolean = useMemo(() => {
        return endDate >= startDate;
    }, [endDate, startDate]);
    return isValid;
}
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

export function useValidCompetitionName(name: string): boolean {
    return useMemo(() => {
        const regexp = new RegExp('.{5,50}');
        return regexp.test(name);
    }, [name]);
}

export function useValidCompetitionEndDate(startDate: Date, endDate: Date): boolean {
    return useMemo(() => {
        return endDate >= startDate;
    }, [endDate, startDate]);
}
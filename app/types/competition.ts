type competition = {
    id: number,
    federationId: number,
    name: string,
    teamIds: number[],
    gameType: string,
    startDate: Date,
    endDate: Date,
    published: boolean
}

type newCompetition = {
    federationId: number,
    name: string,
    gameType: string,
    startDate: Date,
    endDate: Date,
}

type formattedNewCompetition = {
    federationId: number,
    name: string,
    gameType: string,
    startDate: string,
    endDate: string,
}

type formattedCompetition = {
    id: number,
    federationId: number,
    name: string,
    teamIds: number[],
    gameType: string,
    startDate: string,
    endDate: string,
    published: boolean
}
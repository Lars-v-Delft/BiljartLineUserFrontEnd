type team = {
    id: number,
    competitionId: number,
    playerIds: number[],
    name: string,
    homeGameDay: number,
    timesViewed: number
}

type newTeam = {
    competitionId: number,
    playerIds: number[],
    name: string,
    homeGameDay: number
}
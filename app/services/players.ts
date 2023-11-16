import { BASE_URL } from "./billiardsAPI";


export async function getPlayersByTeam(teamId: number): Promise<player[]> {
    try {
        const response = await fetch(`${BASE_URL}/players/by-team/${teamId}`, { cache: "no-cache" })
        if (!response.ok) {
            throw new Error('failed to fetch players')
        }
        const players: player[] = await response.json()
        // await delay(5000);
        // throw new Error('demonstratie')
        return players;
    } catch (error: any) {
        throw new Error(`An error occurred while fething players: ${error.message}`)
    }
}

export async function getPlayers(): Promise<player[]> {
    try {
        const response = await fetch(`${BASE_URL}/players`, { cache: "no-cache" })
        if (!response.ok) {
            throw new Error('failed to fetch players')
        }
        const players: player[] = await response.json()
        // await delay(5000);
        // throw new Error('demonstratie')
        return players;
    } catch (error: any) {
        throw new Error(`An error occurred while fething players: ${error.message}`)
    }
}
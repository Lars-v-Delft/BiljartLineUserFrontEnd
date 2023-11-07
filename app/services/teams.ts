import { BASE_URL } from "./billiardsAPI"
import { delay } from "./delayFunction";

export async function getTeamsByCompetition(id: number): Promise<team[]> {
    try {
        const response = await fetch(`${BASE_URL}/team/byCompetition?id=${id}`, { cache: "no-cache" })
        if (!response.ok) {
            throw new Error('failed to fetch teams')
        }
        const teams: team[] = await response.json()
        await delay(5000);
        return teams;
    } catch (error: any) {
        throw new Error(`An error occurred while fething teams: ${error.message}`)
    }
}
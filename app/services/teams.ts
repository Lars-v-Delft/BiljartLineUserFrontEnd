export async function getTeamsByCompetitionId(id: number) {
    const response = await fetch(`http://localhost:8080/team/byCompetition?id=${id}`, { cache: "no-cache" })
    if (!response.ok) {
        throw new Error('failed to fetch teams')
    }
    return response.json()
}
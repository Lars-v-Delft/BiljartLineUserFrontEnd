


export async function getCompetitionsByFederationId() {
    const response = await fetch('http://localhost:8080/competition/byFederation?federationId=1', { cache: "no-cache" })
    if (!response.ok) {
        throw new Error('failed to fetch competitions')
    }
    return response.json()
}
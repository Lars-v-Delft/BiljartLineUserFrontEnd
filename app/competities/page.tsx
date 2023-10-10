
async function GetCompetitionsByFederationId() {
    return (await fetch('http://localhost:8080/competition/byFederation?id=1')).json()
}

export default async function test() {
    const res = await GetCompetitionsByFederationId();
    //{res.content}
    return <h1>asefaf</h1>
}


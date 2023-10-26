export async function getCompetitionsByFederation(id: number, fromDate: string, toDate: string): Promise<competition[]> {
    const response = await fetch(
        `http://localhost:8080/competition/byFederation?id=${id}&fromDate=${fromDate}&toDate=${toDate}`, { cache: "no-cache" })
    if (!response.ok) {
        throw new Error(`failed to fetch competitions for federation with id ${id}, from ${fromDate} to ${toDate}`)
    }
    const rawData = await response.json();
    // Convert the date strings to Date objects
    const competitions: competition[] = rawData.map(mapCompetitionFromRawData)
    return competitions;
}

export async function getCompetition(id: number): Promise<competition> {
    const response = await fetch(`http://localhost:8080/competition/${id}`, { cache: "no-cache" })
    if (!response.ok) {
        throw new Error(`failed to fetch competition with id ${id}`)
    }
    const rawData = await response.json()
    const competition: competition = mapCompetitionFromRawData(rawData);
    return competition;
}

function mapCompetitionFromRawData(rawData: any): competition {
    return {
        id: rawData.id,
        federationId: rawData.federationId,
        name: rawData.name,
        gameType: rawData.gameType,
        startDate: parseDate(rawData.startDate),
        endDate: parseDate(rawData.endDate),
        published: rawData.published,
    };
}

function parseDate(dateString: string): Date {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based in JavaScript Date
    const day = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
}


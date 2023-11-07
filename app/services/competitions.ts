import { BASE_URL } from "./billiardsAPI";
import { delay } from "./delayFunction";

export async function getCompetitionsByFederation(id: number, fromDate: string, toDate: string): Promise<competition[]> {
    try {
        const url = new URL(`${BASE_URL}/competition/byFederation`);
        const params = new URLSearchParams();
        params.append('id', id.toString());
        params.append('fromDate', fromDate);
        params.append('toDate', toDate);
        url.search = params.toString();

        const response = await fetch(url.toString(), { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Failed to fetch competitions for federation with id ${id}, from ${fromDate} to ${toDate}. HTTP status: ${response.status}${response.url}`)
        }
        const rawData = await response.json();

        const competitions: competition[] = rawData.map(mapCompetitionFromRawData);
        return competitions;
    } catch (error: any) {
        throw new Error(`An error occurred while fetching competitions: ${error.message}`)
    }
}

export async function getCompetition(id: number): Promise<competition> {
    try {
        const response = await fetch(`${BASE_URL}/competition/${id}`, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Failed to fetch competition with id ${id}. HTTP status: ${response.status}`)
        }
        const rawData = await response.json();

        const competition: competition = mapCompetitionFromRawData(rawData);
        await delay(3000);
        throw new Error(`show stijn`)
        return competition;
    } catch (error: any) {
        throw new Error(`An error occurred while fething competition: ${error.message}`)
    }
}

export async function addCompetition(competition: competition): Promise<competition> {
    try {
        const response = await fetch(`${BASE_URL}/competition/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(competition),
            cache: "no-cache"
        });
        if (!response.ok) {
            throw new Error(`Failed to add competition. HTTP status: ${response.status}`)
        }
        const rawData = await response.json();
        const addedCompetition: competition = mapCompetitionFromRawData(rawData);
        return competition;
    } catch (error: any) {
        throw new Error(`Failed to add competion. Error: ${error.message}`)
    }
}

function mapCompetitionFromRawData(rawData: any): competition {
    try {
        return {
            id: rawData.id,
            federationId: rawData.federationId,
            name: rawData.name,
            gameType: rawData.gameType,
            startDate: parseDate(rawData.startDate),
            endDate: parseDate(rawData.endDate),
            published: rawData.published,
        };
    } catch (error: any) {
        throw new Error(`Failed to map responsedata to competition. Error: ${error.message}`)
    }
}

function parseDate(dateString: string): Date {
    try {
        const dateParts = dateString.split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based in JavaScript Date
        const day = parseInt(dateParts[2], 10);
        return new Date(year, month, day);
    } catch (error: any) {
        throw new Error(`Failed to parse ${dateString} to Date. Error: ${error.message}`)
    }
}


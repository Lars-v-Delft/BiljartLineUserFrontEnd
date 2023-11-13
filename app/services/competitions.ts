import { BASE_URL } from "./billiardsAPI";
import { delay } from "./delayFunction";

export async function getCompetitionsByFederation(federationId: number, fromDate: string, toDate: string, publishedOnly: boolean): Promise<competition[]> {
    try {
        const url = new URL(`${BASE_URL}/competitions/by-federation/${federationId}`);
        const params = new URLSearchParams();
        params.append('fromDate', fromDate);
        params.append('toDate', toDate);
        params.append('publishedOnly', publishedOnly.toString());

        url.search = params.toString();
        url.search = params.toString();

        const response = await fetch(url.toString(), { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Failed to fetch competitions for federation with id ${federationId}, from ${fromDate} to ${toDate}. HTTP status: ${response.status}${response.url}`)
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
        const response = await fetch(`${BASE_URL}/competitions/${id}`, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Failed to fetch competition with id ${id}. HTTP status: ${response.status}`)
        }
        const rawData = await response.json();

        const competition: competition = mapCompetitionFromRawData(rawData);
        // await delay(3000);
        // throw new Error(`demonstratie`)
        return competition;
    } catch (error: any) {
        throw new Error(`An error occurred while fething competition: ${error.message}`)
    }
}

export async function postCompetition(newCompetition: newCompetition): Promise<competition> {
    try {
        const formattedNewCompetition: formattedNewCompetition = mapNewCompetitionToformattedNewCompetition(newCompetition);

        const response = await fetch(`${BASE_URL}/competitions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedNewCompetition),
            cache: "no-cache"
        });
        if (!response.ok) {
            //temporary solution to show what wrong in the front-end
            const errorBody = await response.json();
            const errorDetails = Object.entries(errorBody)
                .map(([field, errorMessage]) => `${field}: ${errorMessage}`)
                .join('. ');
            throw new Error(`Failed to add competition. HTTP status: ${response.status}. Errors: ${errorDetails}`);
        }
        const rawData = await response.json();
        const addedCompetition: competition = mapCompetitionFromRawData(rawData);
        return addedCompetition;
    } catch (error: any) {
        throw new Error(`Failed to add competion. Error: ${error.message}`)
    }
}

export async function editCompetition(competition: competition): Promise<competition> {
    try {
        const formattedCompetition: formattedCompetition = mapCompetionToFormattedCompetition(competition);

        const response = await fetch(`${BASE_URL}/competitions`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedCompetition),
            cache: "no-cache"
        });
        if (!response.ok) {
            //temporary solution to show what wrong in the front-end
            const errorBody = await response.json();
            const errorDetails = Object.entries(errorBody)
                .map(([field, errorMessage]) => `${field}: ${errorMessage}`)
                .join('. ');
            throw new Error(`Failed to edit competition. HTTP status: ${response.status}. Errors: ${errorDetails}`);
        }
        const rawData = await response.json();
        const responseCompetition: competition = mapCompetitionFromRawData(rawData);
        return responseCompetition;
    } catch (error: any) {
        throw new Error(`Failed to edit competition. Error: ${error.message}`)
    }
}

export async function deleteCompetition(competitionId: number): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}/competitions/${competitionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache"
        });
        if (!response.ok) {
            throw new Error(`Failed to delete competition. HTTP status: ${response.status}.`);
        }
        return true;
    } catch (error: any) {
        throw new Error(`Failed to delete competion. Error: ${error.message}`)
    }
}

function mapCompetitionFromRawData(rawData: any): competition {
    try {
        return {
            id: rawData.id,
            federationId: rawData.federationId,
            name: rawData.name,
            teamIds: rawData.teamIds,
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

function mapNewCompetitionToformattedNewCompetition(newCompetition: newCompetition): formattedNewCompetition {
    try {
        return {
            federationId: newCompetition.federationId,
            name: newCompetition.name,
            gameType: newCompetition.gameType,
            startDate: formatDate(newCompetition.startDate),
            endDate: formatDate(newCompetition.endDate),
        };
    } catch (error: any) {
        throw new Error(`Failed to map newCompetition to formattedNewCompetition. Error: ${error.message}`)
    }
}

function mapCompetionToFormattedCompetition(competition: competition): formattedCompetition {
    try {
        return {
            id: competition.id,
            federationId: competition.federationId,
            name: competition.name,
            teamIds: competition.teamIds,
            gameType: competition.gameType,
            startDate: formatDate(competition.startDate),
            endDate: formatDate(competition.endDate),
            published: competition.published,
        };
    } catch (error: any) {
        throw new Error(`Failed to map competition to formattedCompetition. Error: ${error.message}`)
    }
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
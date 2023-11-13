import { BASE_URL } from "./billiardsAPI"
import { delay } from "./delayFunction";

export async function getTeamsByCompetition(competitionId: number): Promise<team[]> {
    try {
        const response = await fetch(`${BASE_URL}/teams/by-competition/${competitionId}`, { cache: "no-cache" })
        if (!response.ok) {
            throw new Error('failed to fetch teams')
        }
        const teams: team[] = await response.json()
        // await delay(5000);
        // throw new Error('demonstratie')
        return teams;
    } catch (error: any) {
        throw new Error(`An error occurred while fething teams: ${error.message}`)
    }
}

export async function getTeam(id: number): Promise<team> {
    try {
        const response = await fetch(`${BASE_URL}/teams/${id}`, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Failed to fetch team with id ${id}. HTTP status: ${response.status}`)
        }
        const team: team = await response.json();
        return team;
    } catch (error: any) {
        throw new Error(`An error occurred while fething team: ${error.message}`)
    }
}

export async function postTeam(newTeam: newTeam): Promise<newTeam> {
    try {
        const response = await fetch(`${BASE_URL}/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTeam),
            cache: "no-cache"
        });
        if (!response.ok) {
            //temporary solution to show what wrong in the front-end
            const errorBody = await response.json();
            const errorDetails = Object.entries(errorBody)
                .map(([field, errorMessage]) => `${field}: ${errorMessage}`)
                .join('. ');
            throw new Error(`Failed to add team. HTTP status: ${response.status}. Errors: ${errorDetails}`);
        }
        const team: team = await response.json();
        return team;
    } catch (error: any) {
        throw new Error(`Failed to add team. Error: ${error.message}`)
    }
}

export async function editTeam(team: team): Promise<team> {
    try {
        const response = await fetch(`${BASE_URL}/teams`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(team),
            cache: "no-cache"
        });
        if (!response.ok) {
            //temporary solution to show what wrong in the front-end
            const errorBody = await response.json();
            const errorDetails = Object.entries(errorBody)
                .map(([field, errorMessage]) => `${field}: ${errorMessage}`)
                .join('. ');
            throw new Error(`Failed to edit team. HTTP status: ${response.status}. Errors: ${errorDetails}`);
        }
        const responseTeam: team = await response.json();
        return responseTeam;
    } catch (error: any) {
        throw new Error(`Failed to edit team. Error: ${error.message}`)
    }
}

export async function deleteTeam(teamId: number): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}/teams/${teamId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache"
        });
        if (!response.ok) {
            throw new Error(`Failed to delete team. HTTP status: ${response.status}.`);
        }
        // throw new Error('demonstratie')
        return true;
    } catch (error: any) {
        throw new Error(`Failed to delete competion. Error: ${error.message}`)
    }
}
import { user } from "@nextui-org/theme";
import { base_auth_url } from "./base";


export async function login(credentials: credentials): Promise<string> {
    try {
        const response = await fetch(`${base_auth_url}/authentication/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            cache: "no-cache"
        });

        if (!response.ok)
            throw new Error(`Failed to login. Error: ${response.body}`);

        const resp = await response.json();
        const jwt = mapToJwt(resp);
        return jwt;
        // const user: myUser = mapToUser(rawData);
        // return user;
    } catch (error: any) {
        throw new Error(`Failed to add competion. Error: ${error.message}`)
    }
}


function mapToJwt(resp: any) {
    try {
        const jwt: string = resp.token;
        return jwt;
    } catch (error: any) {
        throw new Error(`Failed to map to jwt. Error: ${error.message}`)
    }
}
// function mapToUser(rawData: any): myUser {
//     try {
//         const user: myUser = {
//             id: rawData.username,
//             jwt: rawData.password
//         };
//         return user;
//     } catch (error: any) {
//         throw new Error(`Failed to map to user. Error: ${error.message}`)
//     }
// }

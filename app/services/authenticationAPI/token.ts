import { getSession } from "next-auth/react";

export async function getJWT(): Promise<string> {
    const session = await getSession();
    console.log(session);
    const jwt = (session as any).accessToken;
    if (jwt) {
        console.log(jwt);
        return jwt;
    }
    else
        throw new Error("No JWT found in session");
}
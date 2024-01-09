import { options } from "@/app/api/auth/[...nextauth]/options";
import { AuthOptions, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export async function getJWT(): Promise<string> {
    const session = await getSession();
    const jwt = (session as any).accessToken;
    if (jwt) {
        return jwt;
    }
    else
        throw new Error("No JWT found in session");
}
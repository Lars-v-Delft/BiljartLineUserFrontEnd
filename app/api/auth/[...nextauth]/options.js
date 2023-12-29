import { login } from "@/app/services/authenticationAPI/authentication";
import { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (credentials?.username == null || credentials?.password == null)
                    return null;

                const formattedCredentials = {
                    username: credentials.username,
                    password: credentials.password
                }

                try {
                    const jwt = await login(formattedCredentials)
                    // If no error return username
                    const user = {
                        id: credentials.username,
                        name: credentials.username,
                        token: jwt
                    }
                    return user;
                } catch (error) {
                    // Return null if user data could not be retrieved
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Persist the access_token to the token right after signin
                token.accessToken = user.token
            }
            return token
        },
        async session({ session, token }) {
            // Make accesstoken available in the session
            session.accessToken = token.accessToken
            return session
        },
        async redirect({ url, baseUrl }) {
            console.log("redirect", '  url:', url, "  baseURL:", baseUrl)

            let redirectUrl = "http://localhost:3000";

            // Allows relative callback URLs
            if (url.startsWith("/")) {
                redirectUrl = `${baseUrl}${url}`
            }
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) {
                redirectUrl = url
            }

            url = baseUrl;
            console.log("RedirectURL", redirectUrl)
            return redirectUrl;
        }
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
}
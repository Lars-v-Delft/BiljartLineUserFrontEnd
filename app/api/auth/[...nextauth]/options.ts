import { login } from "@/app/services/authenticationAPI/authentication";
import { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface myUser extends User {
    token: string
}

interface mySession extends Session {
    token: string
}

export const options: NextAuthOptions = {
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
                console.log("credentials", credentials)
                if (credentials?.username == null || credentials?.password == null)
                    return null;

                const formattedCredentials: credentials = {
                    username: credentials.username,
                    password: credentials.password
                }

                try {
                    const jwt = await login(formattedCredentials)
                    // If no error return username
                    const user: myUser = {
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
    // callbacks: {
    //     async jwt({ token, account }) {
    //         if (account) {
    //             token = Object.assign({}, token, { access_token: account.access_token });
    //         }
    //         console.log("jwt callback", token);
    //         return token
    //     },
    //     async session({ session, token }) {
    //         if (session) {
    //             session = Object.assign({}, session, { access_token: token.access_token })
    //             console.log("session callback", session);
    //         }
    //         return session
    //     }
    // },
    // callbacks: {
    //     async jwt({ token, user, session }) {
    //         console.log("jwt callback", { token, user, session })
    //         return token;
    //     },
    //     async session({ session, token, user }) {
    //         console.log("session callback", { session, token, user })
    //         return session;
    //     }
    // },
    // callbacks: {
    //     async jwt({ token, user, profile }) {
    //         // Persist the OAuth access_token and or the user id to the token right after signin
    //         if (user) {
    //             token.accessToken = user.token
    //             token.id = profile.id
    //         }
    //         return token
    //     }
    // }
    callbacks: {
        async jwt({ token, user }) {
            console.log("jwt callback", { token, user })
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            console.log("session callback", { session })
            return session;
        }
    },

    // callbacks: {
    //     async jwt({ token, user }) {
    //         console.log("jwt callback start", { token, user })
    //         // If a user is returned, add the custom token to the JWT
    //         if (user) {
    //             const user1 = user as myUser;
    //             token.id = user1.id;
    //             token.name = user1.name;
    //             token.jwt = user1.token;
    //         }
    //         console.log("jwt callback end", { token })
    //         return Promise.resolve(token);
    //     },
    //     async session({ session, user }) {
    //         console.log("session callback start", { session, user })
    //         // Add the custom token to the session
    //         if (user) {
    //             const user1 = user as unknown as myUser;
    //             const token = user1.token;
    //             const session1 = session as mySession;
    //             session1.token = token;
    //             console.log("session callback end1", { session1 })
    //             return Promise.resolve(session1);
    //         }
    //         console.log("session callback end2", { session })
    //         return Promise.resolve(session);
    //     },
    // },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
}
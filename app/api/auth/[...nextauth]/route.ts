import { login } from "@/app/services/authenticationAPI/authentication"
import NextAuth, { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { options } from "./options"

const handler = NextAuth(options as AuthOptions)

export { handler as GET, handler as POST }
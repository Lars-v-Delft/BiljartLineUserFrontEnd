import NextAuth, { AuthOptions, User } from "next-auth"
import { options } from "./options"

const handler = NextAuth(options as AuthOptions)

export { handler as GET, handler as POST }
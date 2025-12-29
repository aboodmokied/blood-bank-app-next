
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"
import { User } from "@/types/auth.types"


declare module "next-auth" {
  interface Session {
    user: User
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     user?: User
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      authorize: async (credentials) => {
        try {
             const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
                email: credentials.email,
                password: credentials.password,
                role: credentials.role,
             });
             
             const { user, token } = res.data;

             if (!user) return null;

             return { ...user, accessToken: token } as any;
        } catch (error: any) {
             console.log("Authorize Error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: process.env.NEXT_PUBLIC_API_URL + "/auth/login"
             });
             const message = error.response?.data?.message || "Invalid credentials";
             throw new CredentialsSignin(message);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user as unknown as User;
      }
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        // We can safely cast here because we know token.user follows our structure
        session.user = token.user as any; 
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, 
})

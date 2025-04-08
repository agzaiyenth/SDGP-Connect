import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prismaClient";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your name" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { name, password } = credentials;

        console.log("🚀 Received credentials:", { name, password });

        try {
          const user = await prisma.user.findFirst({
            where: { name: name }
          });

          console.log("🧐 User fetched from DB:", user); 

          if (!user) {
            console.error("❌ User not found in the database");
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);
          console.log("🔑 Password is valid:", isValidPassword); 

          if (!isValidPassword) {
            console.error("❌ Password mismatch");
            return null;
          }

          console.log("✅ User authenticated successfully. Returning user object.");

          return {
            id: user.user_id,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("⚠️ Authorization error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // first time JWT is issued
      if (user) {
        token.id   = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id   = token.id as string;
      session.user.role = token.role as string;
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

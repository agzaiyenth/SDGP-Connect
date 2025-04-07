import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
    
        const validUsers = [
          { id: "1", email: "admin@example.com", password: "password123", name: "Admin User" },
          { id: "2", email: "user@example.com", password: "password123", name: "Regular User" }
        ];

        const user = validUsers.find(user => 
          user.email === credentials?.email && 
          user.password === credentials?.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    // You can add other custom pages here if needed
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});
// app/auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/route"; 

export const { auth } = NextAuth(authConfig);
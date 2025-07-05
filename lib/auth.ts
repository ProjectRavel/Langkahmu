import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      username?: string | null;
      bio?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    username?: string | null;
    bio?: string | null;
    email?: string | null;
    image?: string | null;
    password?: string;
    _id?: string;
  }
}

interface CustomUser extends AdapterUser {
  _id?: string;
  password?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({ email: credentials?.email });

          if (!user || !user.password) {
            throw new Error("User not found or has no password");
          }

          const isValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return user as CustomUser;
        } catch (error) {
          console.error("[authorize] Error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser && account?.provider === "google") {
        const newUser = await User.create({
          name: user.name,
          username: user.name,
          bio: "",
          email: user.email,
          image: user.image,
        });
        user._id = newUser._id;
      } else if (existingUser) {
        user._id = existingUser._id;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id?.toString() || token.id;
        token.username = user.username || token.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
};

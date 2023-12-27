import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@123email.com",
        },
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "text",
          placeholder: "John Smith",
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        console.log("User found:::", user);
        // if no user was found
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // check if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        // if password does not match
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // pass user ID and user role into token
      if (user) {
        return {
          ...token,
          id: user.id,
          role: "user",
        };
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          name: token.name,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      return url ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 10 * 60, // 10 minutes
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
};

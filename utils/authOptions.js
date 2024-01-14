import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth, { DefaultSession } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        return {
          id: profile.sub,
          firstName: profile.name.split(" ")[0],
          lastName: profile.name.split(" ")[1],
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
    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        };
      }
      if (trigger === "update" && session?.firstName) {
        token.firstName = session.firstName;
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id || user.id,
          role: token.role,
          firstName: token.firstName,
          lastName: token.lastName,
          image: token.image,
        },
      };
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
};

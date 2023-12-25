import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        // Fetch the ADMIN role ID from the database
        const role = await prisma.role.findUnique({
          where: { name: "user" },
        });
        console.log("Loggin role" + role.name);
        if (!role) throw new Error("Role not found");

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          // Link the role ID to the user
          role: {
            connect: { id: role?.id },
          },
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
      console.log("JWT Callback", { token, user, trigger, session });
      if (user) {
        token.role = user.role;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session Callback", { session, token, user });
      session.user.role = token.role;
      return session;
    },
  },

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

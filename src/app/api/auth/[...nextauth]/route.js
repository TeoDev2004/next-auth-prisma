import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!userFound) throw new Error("User no found");
        console.log(userFound);
        const matchPass = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPass) throw new Error("wrong password");
        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

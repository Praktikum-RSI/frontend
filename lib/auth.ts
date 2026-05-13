import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        try {
          const decoded = JSON.parse(
            Buffer.from(user.accessToken.split(".")[1], "base64").toString(),
          );

          token.user = {
            id: decoded.account_id || "",
            role_name: decoded.role_name || "",
          };

          token.accessTokenExpiry = decoded.exp ? decoded.exp * 1000 : 0;
        } catch (error) {
          console.error("Failed to decode JWT token:", error);
          token.error = "Failed to decode JWT token";
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      session.user.id = token.user.id;
      session.user.role_name = token.user.role_name;

      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.access_token || !credentials?.refresh_token)
          return null;

        try {
          const decoded = JSON.parse(
            Buffer.from(
              credentials.access_token.split(".")[1],
              "base64",
            ).toString(),
          );

          return {
            accessToken: credentials.access_token,
            refreshToken: credentials.refresh_token,
            id: decoded.account_id || "",
            role_name: decoded.role_name || "",
          };
        } catch (error) {
          console.error("Failed to decode JWT token in authorize:", error);
          return null;
        }
      },
      credentials: {
        access_token: { label: "access_token", type: "text" },
        refresh_token: { label: "refresh_token", type: "text" },
      },
      id: "auth-credentials",
      name: "Login with credentials",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
};

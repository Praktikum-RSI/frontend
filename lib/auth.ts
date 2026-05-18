// ── Client-side auth (cookie-based) ──────────────────────────────────────────

export type Role = "ADMIN" | "USER" | string;

export interface AuthSession {
  accountId: string;
  role: Role;
  token: string;
  expiresAt: number | null;
}

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const SESSION_EVENT = "auth-session-changed";

interface JwtPayload {
  account_id?: string;
  role_name?: string;
  ability?: string;
  exp?: number;
}

function writeCookie(name: string, value: string, maxAge = 86400 * 7): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax; max-age=${maxAge}`;
}

function eraseCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; SameSite=Lax; max-age=0`;
}

function readClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function base64UrlDecode(input: string): string {
  const pad = input.length % 4;
  const padded = pad ? input + "=".repeat(4 - pad) : input;
  const normalized = padded.replace(/-/g, "+").replace(/_/g, "/");
  if (typeof atob === "function") return atob(normalized);
  return Buffer.from(normalized, "base64").toString("binary");
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const raw = base64UrlDecode(parts[1]);
    const json = decodeURIComponent(
      Array.from(raw)
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return readClientCookie(ACCESS_KEY);
}

export function getSession(): AuthSession | null {
  const token = getAccessToken();
  if (!token) return null;
  const payload = decodeJwt(token);
  if (!payload?.account_id || !payload?.role_name) return null;
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    clearSession();
    return null;
  }
  return {
    accountId: payload.account_id,
    role: payload.role_name,
    token,
    expiresAt: payload.exp ? payload.exp * 1000 : null,
  };
}

export function setSession(accessToken: string, refreshToken?: string): AuthSession | null {
  if (typeof window === "undefined") return null;
  writeCookie(ACCESS_KEY, accessToken);
  if (refreshToken) writeCookie(REFRESH_KEY, refreshToken);
  window.dispatchEvent(new Event(SESSION_EVENT));
  return getSession();
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  eraseCookie(ACCESS_KEY);
  eraseCookie(REFRESH_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function isAdmin(session: AuthSession | null): boolean {
  return session?.role === "ADMIN";
}

export function isAuthenticated(session: AuthSession | null): boolean {
  return Boolean(session);
}

export const SESSION_EVENT_NAME = SESSION_EVENT;

// ── Server-side auth (NextAuth) ─────────────────────────────────────────────

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

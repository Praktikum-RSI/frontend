import "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
    role_name: string;
    id: string;
  }

  interface Session {
    accessToken: string;
    error?: string;
    refreshToken: string;
    user: {
      id: string;
      role_name: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpiry: number;
    error?: string;
    refreshToken: string;
    user: {
      id: string;
      role_name: string;
    };
  }
}

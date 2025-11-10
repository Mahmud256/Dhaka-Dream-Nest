import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // 👈 add this line
      image?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // 👈 add this line too
    image?: string;
  }
}
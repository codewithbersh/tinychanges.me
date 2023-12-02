import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    slug: string;
    twitterHandle: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      slug: string;
      twitterHandle: string | null;
    };
  }
}

import { auth } from "@/lib/auth";
import { Session } from "next-auth";

export const getCurrentSession = async (): Promise<Session> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User is not authorized");
  }

  return session;
};

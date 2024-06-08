import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { authConfig } from "@/lib/auth.config";
import connectDB from "../../config/database";

// @ts-ignore
const login = async (credentials) => {
  try {
    await connectDB();
    const user = await User.findOne({ email: credentials.email });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.encryptedPassword,
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const credentialsProvider = CredentialsProvider({
  async authorize(credentials) {
    try {
      return await login(credentials);
    } catch (err) {
      return null;
    }
  },
});

declare module "@auth/core/types" {
  interface User {
    // @ts-ignore
    id: string;
    isAdmin: boolean;
  }

  interface Session {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

export const authOptions = {
  ...authConfig,
  // Configure one or more authentication providers
  providers: [credentialsProvider],
  callbacks: {
    ...authConfig.callbacks,
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

"use server";

import { signIn, signOut } from "@/lib/auth";
import { hashPassword } from "@/tools/password";
import { prisma } from "@/lib/prisma";

export const handleLogin = async (previousState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
    return { success: true };
  } catch (error) {
    if (
      error.message.includes("CredentialsSignin") ||
      error.type === "CredentialsSignin"
    ) {
      return { error: "Invalid username or password" };
    }
    throw error;
  }
};

export const handleRegistration = async (previousState, formData) => {
  const { username, email, password, passwordConfirmation } =
    Object.fromEntries(formData);

  if (!password) {
    return { error: "Password missing" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  if (password !== passwordConfirmation) {
    return { error: "Passwords do not match" };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return { error: "User already exists" };
    }

    await prisma.user.create({
      data: {
        email,
        username,
        encryptedPassword: await hashPassword(password),
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const handleLogout = async () => {
  await signOut();
};

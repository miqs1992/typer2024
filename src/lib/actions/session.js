"use server";

import connectDB from "../../../config/database";
import { signIn, signOut } from "@/lib/auth";
import { User } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { hashPassword } from "@/tools/password";

export const handleLogin = async (previousState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  await connectDB();
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

  await connectDB();
  try {
    const user = await User.findOne({ email });

    if (user) {
      return { error: "User already exists" };
    }

    const newUser = new User({
      email,
      username,
      encryptedPassword: await hashPassword(password),
    });

    await newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const handleLogout = async () => {
  await signOut();
};

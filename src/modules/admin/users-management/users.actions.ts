"use server";

import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { UsersManagementService } from "@/modules/admin/users-management/users.management.service";
import { revalidatePath } from "next/cache";
import { RequestState } from "@/lib/actions/state";
import { ServiceError } from "@/modules/service.error";

const getService = async () => {
  const session = await getCurrentSession();
  return new UsersManagementService(session);
};

export const getUsers = async () => {
  try {
    const service = await getService();
    return service.getUsers();
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch all users");
  }
};

export const getUserById = async (id: string) => {
  try {
    const service = await getService();
    return service.getUserById(id);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch user ${id}`);
  }
};

export const removeUser = async (formData: FormData): Promise<void> => {
  const { id } = Object.fromEntries(formData);
  if (!id) {
    throw new Error("User ID is required");
  }

  try {
    const service = await getService();
    await service.removeUser(id as string);
    revalidatePath("/admin/rounds");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editUser = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id } = Object.fromEntries(formData);
  if (!id) {
    return { error: "User ID is required" };
  }

  try {
    const service = await getService();
    await service.updateUser(id as string, formData);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

"use server";

import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { RoundManagementService } from "@/modules/admin/round-match-management/round-management.service";
import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { ServiceError } from "@/modules/service.error";

const getService = async () => {
  const session = await getCurrentSession();
  return new RoundManagementService(session);
};

export const createRound = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  try {
    const service = await getService();
    await service.createNewRound(formData);
    revalidatePath("/admin/rounds");
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const editRound = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id } = Object.fromEntries(formData);
  if (!id) {
    return { error: "Round ID is required" };
  }

  try {
    const service = await getService();
    await service.updateRound(id as string, formData);
    revalidatePath("/admin/rounds");
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const removeRound = async (formData: FormData): Promise<void> => {
  const { id } = Object.fromEntries(formData);
  if (!id) {
    throw new Error("Round ID is required");
  }

  try {
    const service = await getService();
    await service.removeRound(id as string);
    revalidatePath("/admin/rounds");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRounds = async () => {
  try {
    const service = await getService();
    return service.getRounds();
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch rounds");
  }
};

export const getRound = async (id: string) => {
  try {
    const service = await getService();
    return service.getRound(id);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch round ${id}`);
  }
};

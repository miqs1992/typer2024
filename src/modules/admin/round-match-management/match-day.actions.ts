"use server";

import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { ServiceError } from "@/modules/service.error";
import { MatchDayManagementService } from "@/modules/admin/round-match-management/match-day-management.service";

const getService = async () => {
  const session = await getCurrentSession();
  return new MatchDayManagementService(session);
};

export const createMatchDay = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  try {
    const service = await getService();
    const matchDay = await service.createNewMatchDay(formData);
    revalidatePath(`/admin/rounds/${matchDay.roundId}`);
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const editMatchDay = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id } = Object.fromEntries(formData);
  if (!id) {
    return { error: "Match Day ID is required" };
  }

  try {
    const service = await getService();

    const matchDay = await service.updateMatchDay(id as string, formData);
    revalidatePath(`/admin/rounds/${matchDay.roundId}`);
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const removeMatchDay = async (formData: FormData): Promise<void> => {
  const { id, roundId } = Object.fromEntries(formData);
  if (!id || !roundId) {
    throw new Error("Match Day ID is required");
  }

  try {
    const service = await getService();
    await service.removeMatchDay(id as string);
    revalidatePath(`/admin/rounds/${roundId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMatchDay = async (id: string) => {
  try {
    const service = await getService();
    return service.getMatchDay(id);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch Match Day ${id}`);
  }
};

export const getMatchDaysInRound = async (roundId: string) => {
  try {
    const service = await getService();
    return service.getMatchDaysInRound(roundId);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch Match Day in round ${roundId}`);
  }
};

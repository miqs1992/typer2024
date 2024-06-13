"use server";

import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { MatchManagementService } from "@/modules/admin/round-match-management/match-management.service";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { ServiceError } from "@/modules/service.error";

const getService = async () => {
  const session = await getCurrentSession();
  return new MatchManagementService(session);
};

export const getMatch = async (id: string) => {
  try {
    const service = await getService();
    return service.getMatch(id);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch Match ${id}`);
  }
};

export const getMatchesInDay = async (matchDayId: string) => {
  try {
    const service = await getService();
    return service.getMatchesInDay(matchDayId);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch matches in Match Day ${matchDayId}`);
  }
};

export const createMatch = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { roundId } = Object.fromEntries(formData);

  if (!roundId) {
    throw new Error("Round ID is required");
  }

  try {
    const service = await getService();
    const match = await service.createNewMatch(formData);
    revalidatePath(
      `/admin/rounds/${roundId}/match-days/${match.matchDayId}/matches`,
    );
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const updateMatchDetails = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id, roundId } = Object.fromEntries(formData);
  if (!id || !roundId) {
    throw new Error("Round and Match IDs are required");
  }

  try {
    const service = await getService();
    const match = await service.updateMatch(id as string, formData);
    revalidatePath(`/admin/rounds/${roundId}/matchDays/${match.matchDayId}`);
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const setMatchResult = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id, roundId } = Object.fromEntries(formData);
  if (!id || !roundId) {
    throw new Error("Round and Match IDs are required");
  }

  try {
    const service = await getService();
    const match = await service.setMatchResult(id as string, formData);
    revalidatePath(`/admin/rounds/${roundId}/matchDays/${match.matchDayId}`);
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const removeMatch = async (formData: FormData): Promise<void> => {
  const { id, matchDayId, roundId } = Object.fromEntries(formData);
  if (!id || !matchDayId || !roundId) {
    throw new Error("Round, Match Day, Match IDs are required");
  }

  try {
    const service = await getService();
    await service.removeMatch(id as string);
    revalidatePath(`/admin/rounds/${roundId}/matchDays/${matchDayId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

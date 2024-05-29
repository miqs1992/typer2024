"use server";

import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { CalculationService } from "@/modules/admin/calculations/calculation.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getService = async () => {
  const session = await getCurrentSession();
  return new CalculationService(session);
};

export const calculateDayResults = async (
  formData: FormData,
): Promise<void> => {
  const { matchDayId, roundId } = Object.fromEntries(formData);

  if (!matchDayId || !roundId) {
    throw new Error("Match Day ID is required");
  }

  try {
    const service = await getService();
    await service.calculateDayResults(matchDayId as string);
    revalidatePath(`/admin/rounds/${roundId}/matchDays/${matchDayId}`);
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error(`failed to calculate match day ${matchDayId}`);
  }
  redirect(`/match-day/${matchDayId}`);
};

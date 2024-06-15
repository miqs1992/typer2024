"use server";

import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { ServiceError } from "@/modules/service.error";
import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { ProfileService } from "@/modules/profile/profile.service";

const getService = async () => {
  const session = await getCurrentSession();
  return new ProfileService(session);
};

export const updateProfile = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  try {
    const service = await getService();
    await service.updateProfile(formData);
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

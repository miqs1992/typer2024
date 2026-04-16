import { NonAdminService } from "@/modules/non-admin-service";
import { userJoiSchema } from "@/lib/models/user";
import { ServiceError } from "@/modules/service.error";
import { hashPassword } from "@/tools/password";
import { prisma } from "@/lib/prisma";

export class ProfileService extends NonAdminService {
  public async updateProfile(formData: FormData): Promise<void> {
    const { username, password, passwordConfirmation } =
      Object.fromEntries(formData);

    const { value, error } = userJoiSchema.validate({
      username,
      password: password || undefined,
      passwordConfirmation: passwordConfirmation || undefined,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    try {
      await prisma.user.update({
        where: { id: this.getUserId() },
        data: {
          username: value.username,
          ...(password && {
            encryptedPassword: await hashPassword(value.password),
          }),
        },
      });
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update user ${this.getUserId()}`);
    }
  }
}

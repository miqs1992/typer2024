import { NonAdminService } from "@/modules/non-admin-service";
import { User, userJoiSchema } from "@/lib/models/user";
import { ServiceError } from "@/modules/service.error";
import { hashPassword } from "@/tools/password";

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

    const user = await User.findByIdAndUpdate(this.getUserId(), {
      username: value.username,
      ...(password && {
        encryptedPassword: await hashPassword(value.password),
      }),
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update user ${this.getUserId()}`);
    }
  }
}

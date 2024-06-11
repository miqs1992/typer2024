import { AdminService } from "@/modules/admin/admin-service";
import { IUser, User, userJoiSchema } from "@/lib/models/user";
import { ServiceError } from "@/modules/service.error";
import { hashPassword } from "@/tools/password";

interface PersistedUser {
  id: string;
  email: string;
  username: string;
  points: number;
  exactBetCount: number;
  leagueRank: number;
  isAdmin: boolean;
  hasPaid: boolean;
}

export interface ExtendedPersistedUser extends PersistedUser {
  winner: string;
  topScorer: string;
}

export class UsersManagementService extends AdminService {
  public getUsers = async (): Promise<PersistedUser[]> => {
    try {
      const users = await User.find().sort({ email: 1 });
      return users.map((user) => this.parseUser(user));
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch all users");
    }
  };

  public getUserById = async (id: string): Promise<ExtendedPersistedUser> => {
    let user;

    try {
      user = await User.findById(id).populate("winner").populate("topScorer");
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch user ${id}`);
    }

    if (!user) {
      throw new ServiceError(`User with id ${id} not found`);
    }

    return {
      ...this.parseUser(user),
      winner: user?.winner?.name,
      topScorer: user?.topScorer?.name,
    };
  };

  public async removeUser(id: string): Promise<void> {
    try {
      await User.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to remove round ${id}`);
    }
  }

  public async updateUser(
    id: string,
    formData: FormData,
  ): Promise<ExtendedPersistedUser> {
    const { username, email, password, passwordConfirmation, hasPaid } =
      Object.fromEntries(formData);

    const { value, error } = userJoiSchema.validate({
      username,
      email,
      password: password || undefined,
      passwordConfirmation: passwordConfirmation || undefined,
      hasPaid: hasPaid === "1",
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    const user = await User.findByIdAndUpdate(id, {
      username: value.username,
      email: value.email,
      hasPaid: value.hasPaid,
      ...(password && {
        encryptedPassword: await hashPassword(value.password),
      }),
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update user ${id}`);
    }

    return this.getUserById(id);
  }

  private parseUser = (user: IUser): PersistedUser => {
    console.log(user);

    return {
      id: user.id.toString(),
      email: user.email,
      username: user.username,
      points: user.points,
      exactBetCount: user.exactBetCount,
      leagueRank: user.leagueRank,
      isAdmin: user.isAdmin,
      hasPaid: user.hasPaid,
    };
  };
}

import { Session, User } from "next-auth";
import connectDB from "../../config/database";
import { ServiceError } from "@/modules/service.error";

type StaticThis<T> = { new (session: Session): T };

export abstract class BaseService {
  protected currentUser: User;

  constructor(currentSession: Session) {
    this.currentUser = currentSession.user;
  }

  public static async load<T extends BaseService>(
    this: StaticThis<T>,
    session: Session,
  ) {
    const service = new this(session);

    service.authorize();

    await service.connect();

    return service;
  }

  protected abstract authorize(): void;

  protected async connect() {
    try {
      await connectDB();
    } catch (error) {
      console.log(error);
      throw new ServiceError("Can't connect to database");
    }
  }

  protected isAdmin(): boolean {
    return this.currentUser.isAdmin;
  }

  protected getUserId(): string | undefined {
    return this.currentUser.id;
  }
}

import { Session, User } from "next-auth";

type StaticThis<T> = { new (session: Session): T };

export abstract class BaseService {
  protected currentUser: User;
  protected session: Session;

  constructor(currentSession: Session) {
    this.session = currentSession;
    this.currentUser = currentSession.user;
  }

  public static async load<T extends BaseService>(
    this: StaticThis<T>,
    session: Session,
  ) {
    const service = new this(session);

    service.authorize();

    return service;
  }

  protected abstract authorize(): void;

  protected isAdmin(): boolean {
    return this.currentUser.isAdmin;
  }

  protected getUserId(): string | undefined {
    return this.currentUser.id;
  }
}

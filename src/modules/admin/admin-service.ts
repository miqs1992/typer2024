import { BaseService } from "@/modules/base.service";

export class AdminService extends BaseService {
  protected authorize() {
    if (!this.isAdmin()) {
      throw new Error("User is not an admin");
    }
  }
}

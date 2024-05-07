import { BaseService } from "@/modules/base.service";

export class NonAdminService extends BaseService {
  protected authorize() {
    if (!this.getUserId()) {
      throw new Error("Not authorized to perform this action");
    }
  }
}

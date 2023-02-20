import { RemoteApi } from "../../common/config/remote_api";
import { AxiosHttp } from "../../common/helper/axios_http";
import { ErrorHandler } from "../../common/helper/error_handler";
import { AuthRepository } from "../../domain/port/repository/auth_repository";

class AuthRemote implements AuthRepository {
  private client = AxiosHttp.client();

  async login(option?: { [key: string]: any } | undefined): Promise<string> {
    try {
      const request = await this.client.post(RemoteApi.auth, { data: option! });
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }
}

export { AuthRemote };

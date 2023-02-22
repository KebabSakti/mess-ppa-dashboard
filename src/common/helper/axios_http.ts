import axios, { AxiosRequestConfig } from "axios";
import { RemoteApi } from "../../common/config/remote_api";

class AxiosHttp {
  client() {
    let config: AxiosRequestConfig = {
      baseURL: RemoteApi.base,
      headers: { "Content-Type": "application/json" },
    };

    const token = sessionStorage.getItem("auth");

    if (token != null) {
      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    const instance = axios.create(config);

    return instance;
  }
}

export { AxiosHttp };

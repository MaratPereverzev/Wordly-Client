import { AxiosRequestConfig } from "axios";

import { AuthPostParams } from "@/shared/api/auth/model";
import { postAuth } from "@/shared/api/auth";

class Auth {
  #URL = "http://localhost:8080/api/auth/login";

  async post(params: AxiosRequestConfig<AuthPostParams>) {
    return await postAuth(params, this.#URL);
  }
}

const Instance = new Auth();

export default Instance;

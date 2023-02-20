import { ErrorBase } from "./error_base";

class ResourceNotFound extends ErrorBase {
  constructor(message = "Data tidak ditemukan") {
    super(404, message);
    this.name = "Resource not found";
  }
}

export { ResourceNotFound };

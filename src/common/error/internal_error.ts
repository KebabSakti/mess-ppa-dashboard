import { ErrorBase } from "./error_base";

class InternalError extends ErrorBase {
  constructor(message = "Terjadi kesalahan pada internal sistem") {
    super(500, message);
    this.name = "Internal Error";
  }
}

export { InternalError };

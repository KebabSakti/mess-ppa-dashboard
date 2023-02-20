import { ErrorBase } from "./error_base";

class Unauthorized extends ErrorBase {
  constructor(message = "Akses tidak di izinkan") {
    super(401, message);
    this.name = "Unauthorized";
  }
}

export { Unauthorized };

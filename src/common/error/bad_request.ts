import { ErrorBase } from "./error_base";

class BadRequest extends ErrorBase {
  constructor(message: string) {
    super(400, message);
    this.name = "Bad Request";
  }
}

export { BadRequest };

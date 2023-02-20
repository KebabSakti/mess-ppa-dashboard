import { ErrorBase } from "../error/error_base";
import { InternalError } from "../error/internal_error";

class ErrorHandler {
  static read(error: Error) {
    console.log(error);

    let e = new InternalError(error.message);

    if (error instanceof ErrorBase) {
      e = error;
    }

    return e;
  }
}

export { ErrorHandler };

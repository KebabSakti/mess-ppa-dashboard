class ErrorBase extends Error {
  code?: number;

  constructor(code = 500, message = "Unknown error") {
    super(message);
    this.name = "Internal Error";
    this.code = code;
  }
}

export { ErrorBase };

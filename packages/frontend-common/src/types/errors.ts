export class ServerError<T = undefined> extends Error {
  public readonly status: number;
  public readonly data?: T;

  constructor(status: number, message: string, data?: T) {
    super(message);
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
};
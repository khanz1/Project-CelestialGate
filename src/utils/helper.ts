import { nanoid } from "nanoid";

export class Helper {
  static generateUID(): string {
    return nanoid(15);
  }

  static fResponse(data: any, status: number = 200, message: string = 'Success') {
    return {
      statusCode: status,
      message,
      data,
    };
  }
}

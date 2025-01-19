import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let res: { message: string | string[] } = {
      message: 'Internal server error',
    };

    console.log(exception, '<<< exception');

    if (exception instanceof HttpException) {
      this.logger.error(exception.getResponse(), '<<< response');
      this.logger.error(exception.stack, '<<< stack');
      httpStatus = exception.getStatus();
      res = exception.getResponse() as { message: string | string[] };
    }

    const responseBody = {
      data: {
        message: Array.isArray(res.message)
          ? res.message?.[res.message?.length - 1]
          : res.message,
      },
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

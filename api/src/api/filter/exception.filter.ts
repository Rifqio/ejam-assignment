import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Response as BaseResponse } from '../response';

// This filter catches all internal server errors and logs them. It returns a generic error response.
@Catch(InternalServerErrorException)
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        return BaseResponse.error(exception.message, 'Internal Server Error');
    }
}


// This filter catches all validation errors and returns a generic validation error response.
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const errors = exception.getResponse() as {
            message: Array<string>;
            error: string;
            statusCode: number;
        };

        const responseJson = BaseResponse.errors(
            errors.message,
            'Validation failed',
        );
        response.status(HttpStatus.BAD_REQUEST).json(responseJson);
    }
}

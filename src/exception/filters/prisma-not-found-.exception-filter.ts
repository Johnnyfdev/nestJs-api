import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        console.log('=====================');
        console.log(exception);
        console.log('=====================');

        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        const messageError = exception.meta?.cause ?? exception.message;

        if (exception.code === 'P2025') {
            response.status(404).json({
                statusCode: 404,
                message: messageError,
                error: 'Not Found',
            });
        } else {
            response.status(500).json({
                statusCode: 500,
                message: messageError,
                error: 'Internal Server Error',
            });

        }
    }

}

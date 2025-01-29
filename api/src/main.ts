import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CONFIG } from './api/config';
import { GlobalExceptionFilter, ValidationExceptionFilter } from './api/filter';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
    });

    app.useGlobalPipes(
        new ValidationPipe({
            enableDebugMessages: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    app.useGlobalFilters(
        new GlobalExceptionFilter(),
        new ValidationExceptionFilter(),
    );
    await app.listen(CONFIG.PORT);
}
bootstrap();

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from './api/middleware';
import { SuperheroModule } from './features/superhero/superhero.module';

@Module({
    imports: [SuperheroModule],
    controllers: [],
    providers: [],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}

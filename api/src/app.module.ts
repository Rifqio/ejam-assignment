import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from './api/middleware';
import { AppService } from './app.service';
import { SuperheroModule } from './features/superhero/superhero.module';

@Module({
    imports: [SuperheroModule],
    controllers: [],
    providers: [AppService],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}

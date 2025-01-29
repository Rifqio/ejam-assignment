import { Module } from '@nestjs/common';
import { SuperheroRepository } from './superhero.repository';

@Module({
    exports: [SuperheroRepository],
    providers: [SuperheroRepository],
})
export class RepositoryModule {}

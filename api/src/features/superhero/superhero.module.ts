import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/api/database/repositories";
import { SuperheroController } from "./superhero.controller";
import { SuperheroService } from "./superhero.service";

@Module({
    imports: [RepositoryModule],
    controllers: [SuperheroController],
    providers: [SuperheroService]
})
export class SuperheroModule {}
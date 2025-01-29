import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { Superhero } from 'src/api/database/model';
import { Response } from 'src/api/response';
import { CreateSuperheroRequest, GetSuperheroRequest } from './dto/superhero.request';
import { SuperheroService } from './superhero.service';

@Controller('v1/superhero')
export class SuperheroController {
    constructor(private readonly superheroService: SuperheroService) {}

    @Get()
    public getSuperhero(@Query() filter: GetSuperheroRequest) {
        const superheroes = this.superheroService.getSuperheroes(filter);        
        return Response.paginate<Superhero>(superheroes, filter.page, filter.take, 'Superheroes retrieved successfully');
    }

    @Post()
    @HttpCode(201)
    public createSuperhero(@Body() payload: CreateSuperheroRequest) {
        const superhero = this.superheroService.createSuperhero(payload);
        return Response.success<Superhero>(superhero, 'Superhero created successfully');
    }
}

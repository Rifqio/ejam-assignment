import { Injectable } from '@nestjs/common';
import { Superhero } from 'src/api/database/model';
import { SuperheroRepository } from 'src/api/database/repositories';
import { FilterOptions } from 'src/api/database/repositories/repository.interface';
import { CreateSuperheroRequest, GetSuperheroRequest } from './dto/superhero.request';

@Injectable()
export class SuperheroService {
    constructor(private readonly superheroRepository: SuperheroRepository) {}

    public getSuperheroes(filter: GetSuperheroRequest): Superhero[] {
        const { page = 1, take = 10, orderBy = 'humilityScore', order = 'DESC' } = filter;
        const options: FilterOptions<Superhero> = {
            orderBy: orderBy as keyof Superhero,
            order,
            page,
            limit: take,
        };
        return this.superheroRepository.findWithFilter(options);
    }

    public createSuperhero(data: CreateSuperheroRequest) {
        return this.superheroRepository.create({
            name: data.name,
            humilityScore: data.humilityScore,
            powers: data.powers,
        })
    }
}

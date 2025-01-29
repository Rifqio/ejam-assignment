import { Injectable, NotFoundException } from '@nestjs/common';
import { Superhero } from '../model';
import { FilterOptions, Repository } from './repository.interface';

@Injectable()
export class SuperheroRepository implements Repository<number, Superhero> {
    private superheroes: Superhero[] = [];
    private idCounter = 1;

    public create(model: Omit<Superhero, 'id' | 'createdAt' | 'updatedAt'>): Superhero {
        const newSuperhero: Superhero = {
            ...model,
            id: this.idCounter++,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.superheroes.push(newSuperhero);
        return newSuperhero;
    }

    public update(id: number, model: Superhero): Superhero {
        const index = this.superheroes.findIndex(
            (superhero) => superhero.id === id,
        );
        if (index === -1) {
            throw new NotFoundException(`Superhero with id ${id} not found`);
        }
        this.superheroes[index] = { ...this.superheroes[index], ...model };
        return model;
    }

    public delete(id: number): boolean {
        const index = this.superheroes.findIndex(
            (superhero) => superhero.id === id,
        );
        if (index === -1) {
            throw new NotFoundException(`Superhero with id ${id} not found`);
        }
        this.superheroes.splice(index, 1);
        return true;
    }

    public findAll(): Superhero[] {
        return this.superheroes;
    }

    public findById(id: number): Superhero {
        const superhero = this.superheroes.find(
            (superhero) => superhero.id === id,
        );
        if (!superhero) {
            throw new NotFoundException(`Superhero with id ${id} not found`);
        }
        return superhero;
    }

    public findWithFilter(options: FilterOptions<Superhero>): Superhero[] {
        const {
            filter = {},
            orderBy = 'humilityScore',
            order = 'DESC',
            page = 1,
            limit = 10,
        } = options;

        // Filter the superheroes
        let filteredSuperheroes = this.superheroes.filter((superhero) => {
            return Object.keys(filter).every(
                (key) => superhero[key] === filter[key],
            );
        });

        // Sort the superheroes
        filteredSuperheroes = filteredSuperheroes.sort((a, b) => {
            if (order === 'ASC') {
                return a[orderBy] > b[orderBy] ? 1 : -1;
            } else {
                return a[orderBy] < b[orderBy] ? 1 : -1;
            }
        });

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return filteredSuperheroes.slice(startIndex, endIndex);
    }
}

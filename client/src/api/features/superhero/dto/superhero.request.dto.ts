export interface SuperheroFormDTO {
    name: string;
    humilityScore: number;
    powers: string[];
}

export interface GetSuperheroesParamsDTO {
    page: number;
    take: number;
    orderBy: string;
    order: 'ASC' | 'DESC';
}
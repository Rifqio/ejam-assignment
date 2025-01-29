// Since I am using in memory storage (array), I don't have to make it promise based.
export interface FilterOptions<M> {
    filter?: Partial<M>;
    orderBy?: keyof M; 
    order?: 'ASC' | 'DESC'; 
    page?: number;
    limit?: number;
}

export interface Repository<K, M> {
    create(model: M): M;
    update(id: K, model: M): M;
    delete(id: K): boolean;
    findAll(): M[];
    findById(id: K): M;
    findWithFilter(filter: FilterOptions<M>): M[];
}

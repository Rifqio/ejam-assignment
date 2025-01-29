export class Superhero {
    public id: number;
    public name: string;
    public humilityScore: number;
    public powers: string[];
    public createdAt: Date;
    public updatedAt: Date;

    constructor(init?: Partial<Superhero>) {
        Object.assign(this, init);
    }
}
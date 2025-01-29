import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class GetSuperheroRequest {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    page: number = 1;

    @IsNumber()
    @Type(() => Number)
    @Min(5)
    @Max(20)
    take: number = 5;

    @IsOptional()
    @IsString()
    orderBy: string = 'humilityScore';

    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    order: 'ASC' | 'DESC' = 'DESC';
}

export class CreateSuperheroRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Max(10)
    @Min(1)
    humilityScore: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    powers: string[];
}
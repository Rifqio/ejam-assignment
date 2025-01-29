import { BaseResponse } from '@/api/base-response';
import { instance } from '../../axios';
import { SuperheroFormDTO } from './dto/superhero.request.dto';
import { CreateSuperheroResponseDTO } from './dto/superhero.response.dto';

export const POSTCreateSuperhero = async (data: SuperheroFormDTO) => {
    try {
        const response = await instance.post<BaseResponse<CreateSuperheroResponseDTO>>('/v1/superhero', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const GETSuperheroes = async (): Promise<BaseResponse<CreateSuperheroResponseDTO[]>> => {
    try {
        const response = await instance.get<BaseResponse<CreateSuperheroResponseDTO[]>>('/v1/superhero');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

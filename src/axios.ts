import axios, { AxiosResponse } from 'axios';
import { iCharacter } from './types';

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
});

interface CharactersResponse {
    info: { count: number; pages: number; next: string; prev: string | null };
    results: iCharacter[];
}

export async function fetchCharacters(page: number) {
    try {
        const result: AxiosResponse<CharactersResponse> = await instance.get(
            `/character/?page=${page}`
        );
        return result?.data?.results;
    } catch (error) {
        console.log(error, 'api error');
    }
}

export async function fetchCharacter(id: string) {
    try {
        const result: AxiosResponse<iCharacter> = await instance.get(
            `/character/${id}`
        );
        return result?.data;
    } catch (error) {
        console.log(error, 'api error');
    }
}

export default instance;

import { IRouteSlugs, IRoute } from "../types/constants";

export const INITIAL_INFO = { info: [] };

export const DICTIONARY: {[key: string]: string} = {
    name: 'Имя',
    air_date: 'Дата выхода',
    episode: 'Эпизод',
    created: 'Создан',
    status: 'Статус',
    species: 'Вид',
    gender: 'Пол',
    type: 'Тип',
    dimension: 'Измерение',
};

export const BASE_FETCH_URL = ' https://rickandmortyapi.com/api';

export const ROUTE_SLUGS: IRouteSlugs = {
    heros: 'Герои',
    episodes: 'Эпизоды',
    locations: 'Локации',
};

export const INITIAL_ROUTES = {
    main: '/',
    category: '/category/:slug',
    detail: '/category/:slug/:id',
    login: '/login',
    notFound: '*',
};

export const ROUTES: IRoute[] = [
    {
        id: 1,
        path: '/',
        label: 'Главная',
    },
    {
        id: 2,
        path: '/category/character',
        label: 'Герои',
    },
    {
        id: 3,
        path: '/category/location',
        label: 'Локации',
    },
    {
        id: 4,
        path: '/category/episode',
        label: 'Эпизоды',
    },

]
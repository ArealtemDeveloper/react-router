import { IRouteSlugs, IRoute, ICategoryType } from "../types/constants";

export const INITIAL_INFO = { info: [], type: 'heros' as ICategoryType };

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

export const ROUTE_SLUGS: IRouteSlugs = {
    heros: 'Герои',
    episodes: 'Эпизоды',
    locations: 'Локации',
};

export const INITIAL_ROUTES = {
    main: '/',
    category: '/category/:slug',
    detail: '/category/:slug/:id',
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
        path: '/category/heros',
        label: 'Герои',
    },
    {
        id: 3,
        path: '/category/locations',
        label: 'Локации',
    },
    {
        id: 4,
        path: '/category/episodes',
        label: 'Эпизоды',
    },

]
import { ICategoryItem } from '../types/constants';
import heros from './heros.json'
import episodes from './episodes.json'
import locations from './locations.json'

export const CATEGORIES_DATA: { [key: string]: ICategoryItem } = {
    heros: {
        info: heros,
        type: 'heros',
    },
    episodes: {
        info: episodes,
        type: 'episodes',
    },
    locations: {
        info: locations,
        type: 'locations',
    },
};
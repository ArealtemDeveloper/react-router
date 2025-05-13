export interface IRouteSlugs {[key: string]: string};

export type ICategoryType = 'heros' | 'episodes' | 'locations';

export interface ICategoryItem  {
    info: { [key: string]: any }[];
    type: ICategoryType;
};

export interface IRoute {
    id: number,
    path: string,
    label: string,
};
export interface IRouteSlugs {[key: string]: string};

export interface ICategory {
    info: {[key: string]: any};
    results: { [key: string]: any }[];
};

export interface IDetailCard {
    data: { [key: string]: any };
};
export interface IRoute {
    id: number,
    path: string,
    label: string,
};
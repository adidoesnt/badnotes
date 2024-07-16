export type FindOptions<T> = {
    properties?: Partial<T>;
    limit?: number;
    order?: string | object | any[];
    skip?: number;
};
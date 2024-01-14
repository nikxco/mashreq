export type FetchResponse<T> = {
    body: T;
    headers: Headers;
};

export type User = {
    id: string;
    username: string,
    createdOn?: number;
}
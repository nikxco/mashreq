export type Country = {
    code: string,
    name: string,
    locale: string,
    basename: string
}
export type ValidationError = {
    code?: string,
    field?: string;
    message?: string;
}
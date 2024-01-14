import { UserRole } from "./auth.constant";

export type User = {
    id: string;
    username: string,
    password?: string;
    createdOn?: number;
}
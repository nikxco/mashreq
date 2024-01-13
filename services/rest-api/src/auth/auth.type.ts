import { UserRole } from "./auth.constant";

export type User = {
    id: string;
    name: string,
    email: string;
    emailVerified?: boolean;
    roles?: UserRole[]
}
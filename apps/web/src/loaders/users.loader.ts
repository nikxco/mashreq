import { getAllUsers } from "../pages/services/users.service";

export const usersLoader = async (
) => {
    return getAllUsers();
};
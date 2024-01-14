import { User } from "../users/user.type";

export class MockDatabase {
    private users: User[] = []
    constructor() { }
    private getUserByFilter(filter: (user: User) => boolean) {
        return this.users.find(filter);
    }
    getUserByUsername(username: string) {
        return this.getUserByFilter((user: User) => {
            /**
             * Username is case insensensitive
             */
            return user.username.toLocaleLowerCase() === username.toLocaleLowerCase();
        })
    }
    addUser(user: User) {
        this.users.push(user);
    }
    getUsers(projection?: (user: User) => any) {
        return this.users.map((user) => {
            if (projection) {
                return projection(user);
            } else {
                return user;
            }
        });
    }
}
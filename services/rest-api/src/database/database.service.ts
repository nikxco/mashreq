import { executeOnce } from "../common/util.common";
import { MockDatabase } from "./mock.database";

/**
 * Creates instance of the mock database
 * @returns {MockDatabase}
 */
const connectToDatabase = (): MockDatabase => {
    let databaseClient;
    try {
        console.log("Connecting to database...");
        databaseClient = new MockDatabase();
        console.log("Successfully connected to database!");
        return databaseClient;
    } catch (error) {
        console.error("Connection to database failed!", error);
        process.exit();
    }
};

/**
 * Open connection to db and cache it, 
 * It returns the cached instance on further calls.
 * */
export const getDatabaseInstance: () => MockDatabase = executeOnce(
    () => connectToDatabase()
);
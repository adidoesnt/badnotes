import { UserModel, type User } from "neo4j/models";
import { Logger } from "utils";
import { relative } from "path";

const logger = new Logger({
    module: relative(process.cwd(), __filename),
});

export type FindOptions = {
    properties?: Partial<User>;
    limit?: number;
    order?: string | object | any[];
    skip?: number;
};

export const createUser = async (data: User) => {
    try {
        const user = await UserModel.create(data);
        const userObj = await user.toJson();
        logger.info("User created", { user: userObj });
        return userObj;
    } catch (e) {
        const error = e as Error;
        const { message } = error;
        logger.error("Error creating user", { message });
    }
};

export const getUser = async ({ username }: { username: string }) => {
    try {
        const user = await UserModel.find(username);
        const userObj = await user.toJson();
        logger.info("User found", { user: userObj });
        return userObj;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting user by username", error);
    }
};

export const getUsers = async (options?: FindOptions) => {
    try {
        const users = await UserModel.all(options);
        const usersObj = await users.toJson();
        logger.info("Users found", { users: usersObj });
        return usersObj;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting users", error);
    }
};

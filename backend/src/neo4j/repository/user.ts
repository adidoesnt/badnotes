import { UserModel, type User } from "neo4j/models";
import { Logger } from "utils";
import { relative } from "path";

const logger = new Logger({
    module: relative(process.cwd(), __filename),
});

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

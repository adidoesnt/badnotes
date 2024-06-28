import type { User } from "neo4j/models";
import { userRepository } from "neo4j/repository";
import type { NodeProperty } from "neode";
import { relative } from "path";
import { Logger } from "utils";
import { userService } from ".";

const logger = new Logger({
    module: relative(process.cwd(), __filename),
});

export const createUser = async ({ username, password }: User) => {
    try {
        logger.debug("Checking if user exists", { username });
        const userExists = await checkIfUserExists({
            username,
        });
        if (userExists) throw new Error("User already exists");
        logger.debug("Creating user", { username });
        const passwordHash = (await Bun.password.hash(
            password as string,
        )) as NodeProperty;
        const user = await userRepository.createUser({
            username,
            password: passwordHash,
        });
        return user;
    } catch (e) {
        const error = e as Error;
        const { message } = error;
        logger.error("Error creating user", { message });
    }
};

export const getUser = async ({ username }: { username: string }) => {
    try {
        logger.debug("Getting user by username", { username });
        const user = await userRepository.getUser({
            username,
        });
        return user;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting user by username", error);
    }
};

export const checkIfUserExists = async ({
    username,
}: {
    username: string | NodeProperty;
}) => {
    try {
        logger.debug("Checking if user exists", { username });
        const user = await getUser({ username: username as string });
        return !!user;
    } catch (e) {
        const error = e as Error;
        logger.error("Error checking if user exists", error);
    }
};

export const getAllUsers = async () => {
    try {
        logger.debug("Getting all users");
        const users = await userRepository.getUsers();
        return users;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting all users", error);
    }
};

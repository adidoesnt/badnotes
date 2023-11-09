import { User } from "../types";

export const findByUUID = async (users: User[], uuid: string) => {
    if (uuid) return users.filter((user) => user.uuid === uuid);
};

export const findByUsername = async (users: User[], username: string) => {
    if (username) return users.filter((user) => user.username === username);
};

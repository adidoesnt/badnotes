import { UserRepository } from '@repository';
import { User } from '@types';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    static findAllUsers = async () => await UserRepository.findAllUsers();

    static findByUUID = async (users: User[], uuid: string) => {
        if (uuid) return users.filter((user) => user.uuid === uuid);
    };

    static findByUsername = async (users: User[], username: string) => {
        if (username) return users.filter((user) => user.username === username);
    };

    static createUser = async (username: string) => {
        const uuid = uuidv4();
        return await UserRepository.createUser(username, uuid);
    };

    static updateUser = async (uuid: string, username: string) => {
        return await UserRepository.updateUser(username, uuid);
    };

    static addFriend = async (uuid1: string, uuid2: string) => {
        return await UserRepository.addFriend(uuid1, uuid2);
    };
}

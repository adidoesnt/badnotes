import { UserService } from '@service';
import { User } from '@types';

export class UserController {
    static findUserController = async (_: any, args: Record<string, any>) => {
        const users =
            (await UserService.findAllUsers()) as unknown as Array<User>;
        const { username, uuid } = args;
        if (uuid) return UserService.findByUUID(users, uuid);
        if (username) return UserService.findByUsername(users, username);
        return users;
    };

    static createUserController = async (_: any, args: Record<string, any>) => {
        const { username } = args;
        return await UserService.createUser(username);
    };

    static updateUserController = async (_: any, args: Record<string, any>) => {
        const { uuid, username } = args;
        return await UserService.updateUser(uuid, username);
    };
}

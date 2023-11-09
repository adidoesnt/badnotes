import { UserRepository } from '@repository'
import { User } from '@types'

export class UserService {
    static findAllUsers = async () => await UserRepository.findAllUsers()

    static findByUUID = async (users: User[], uuid: string) => {
        if (uuid) return users.filter((user) => user.uuid === uuid)
    }

    static findByUsername = async (users: User[], username: string) => {
        if (username) return users.filter((user) => user.username === username)
    }
}

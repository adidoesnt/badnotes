import { database } from '@db'

export class UserRepository {
    static findAllUsers = async () => {
        const query = 'MATCH (n:USER) RETURN n'
        const result = await database.runQuery(query, 'n')
        return result
    }
}

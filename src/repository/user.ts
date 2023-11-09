import { Record } from 'neo4j-driver'
import { database } from '@db'

export class UserRepository {
    static async runQuery(query: string) {
        const result = await database.session.run(query)
        const records: Array<Record> = []
        result.records.forEach((record) => {
            records.push(record.get('n').properties)
        })
        return records
    }

    static findAllUsers = async () => {
        const query = 'MATCH (n:USER) RETURN n'
        const result = await UserRepository.runQuery(query)
        return result
    }
}

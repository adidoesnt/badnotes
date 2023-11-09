import { database } from '@db'
import { Record } from 'neo4j-driver'

export class NoteRepository {
    static async runQuery(query: string) {
        const result = await database.session.run(query)
        const records: Array<Record> = []
        result.records.forEach((record) => {
            records.push(record.get('n').properties)
        })
        return records
    }

    static findAllNotes = async () => {
        const query = 'MATCH (n:NOTE) RETURN n'
        const result = await NoteRepository.runQuery(query)
        return result
    }

    static findByUserUUID = async (uuid: string) => {
        const query = `MATCH (u:USER {uuid: '${uuid}'})-[:WROTE]->(n:NOTE) WITH u, COLLECT(n) AS notes RETURN notes`
        const result = await NoteRepository.runQuery(query)
        return result
    }

    static findByUsername = async (username: string) => {
        const query = `MATCH (u:USER {username: '${username}'})-[:WROTE]->(n:NOTE) WITH u, COLLECT(n) AS notes RETURN notes`
        const result = await NoteRepository.runQuery(query)
        return result
    }
}

import { database } from '@db';

export class NoteRepository {
    static findAllNotes = async () => {
        const query = 'MATCH (result:NOTE) RETURN result';
        const result = await database.runQuery(query);
        return result;
    };

    static findByUserUUID = async (uuid: string) => {
        const query = `MATCH (u:USER {uuid: '${uuid}'})-[:WROTE]->(n:NOTE) WITH u, COLLECT(n) AS result RETURN result`;
        const result = await database.runQuery(query);
        return result;
    };
}

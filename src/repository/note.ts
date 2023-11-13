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

    static createNoteByUserUUID = async (
        uuid: string,
        uid: string,
        title: string,
        content: string,
        time: string
    ) => {
        const mutation =
            `MATCH (u:USER { uuid: "${uuid}"}) ` +
            `CREATE (n:NOTE { uid:" ${uid}", title: "${title}", content: "${content}" })<-[:WROTE { time: "${time}" }]-(u) ` +
            `RETURN n`;
        const result = await database.runMutation(mutation, 'n');
        return result?.pop();
    };
}

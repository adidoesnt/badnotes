import { database } from '@db';

export class UserRepository {
    static findAllUsers = async () => {
        const query = 'MATCH (n:USER) RETURN n';
        const result = await database.runQuery(query, 'n');
        return result;
    };

    static createUser = async (username: string, uuid: string) => {
        const query = `CREATE (a:USER { username: "${username}", uuid: "${uuid}"}) return a`;
        const result = await database.runMutation(query, 'a');
        return result?.pop();
    };
}

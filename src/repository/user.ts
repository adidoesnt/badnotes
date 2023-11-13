import { database } from '@db';

export class UserRepository {
    static findAllUsers = async () => {
        const query = 'MATCH (n:USER) RETURN n';
        const result = await database.runQuery(query, 'n');
        return result;
    };

    static createUser = async (username: string, uuid: string) => {
        const mutation = `CREATE (a:USER { username: "${username}", uuid: "${uuid}"}) RETURN a`;
        const result = await database.runMutation(mutation, 'a');
        return result?.pop();
    };

    static updateUser = async (username: string, uuid: string) => {
        const mutation = `MATCH (a:USER { uuid: "${uuid}"}) SET a.username = "${username}" RETURN a`;
        const result = await database.runMutation(mutation, 'a');
        return result?.pop();
    };

    static addFriend = async (uuid1: string, uuid2: string) => {
        const mutation = `MATCH (a: USER { uuid: "${uuid1}" }) ` +
            `MATCH (b: USER { uuid: "${uuid2}" })` +
            `CREATE (a) - [:IS_FRIENDS_WITH] -> (b) ` +
            `CREATE (b) - [:IS_FRIENDS_WITH] -> (a) ` +
            `WITH COLLECT(a) + COLLECT(b) AS r ` +
            `RETURN r`
        const result = await database.runMutation(mutation, 'r');
        return result;
    }
}

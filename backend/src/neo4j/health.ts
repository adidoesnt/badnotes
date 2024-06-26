import { neode } from "neo4j/driver";

export const healthCheck = async () => {
    await neode.cypher("MATCH (n) RETURN n LIMIT 0", {});
};

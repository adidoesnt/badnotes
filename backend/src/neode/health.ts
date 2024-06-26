import { neode } from "./driver";

export const healthCheck = async () => {
    await neode.cypher("MATCH (n) RETURN n LIMIT 0", {});
};

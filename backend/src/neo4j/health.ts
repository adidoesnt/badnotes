import { neode } from "neo4j/driver";
import { relative } from "path";
import { Logger } from "utils";

const logger = new Logger({
    module: relative(process.cwd(), __filename),
});

export const healthCheck = async () => {
    const testQuery = "MATCH (n) RETURN n LIMIT 0";
    logger.debug("Running test query", { query: testQuery });
    await neode.cypher(testQuery, {});
};

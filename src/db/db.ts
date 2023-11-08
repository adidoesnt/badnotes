import neo4j, { Record } from "neo4j-driver";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

export enum Entity {
  USER = "USER",
  NOTE = "NOTE",
}

export const findAll = async (entity?: keyof typeof Entity) => {
  const driver = neo4j.driver(
    `bolt://${DB_HOST}:${DB_PORT}`,
    neo4j.auth.basic(`${DB_USERNAME}`, `${DB_PASSWORD}`)
  );

  const session = driver.session();
  const queryVar = entity ? `n:${entity}` : "(n)";
  const result = await session.run(`MATCH (${queryVar}) RETURN n`);
  const records: Array<Record> = [];
  result.records.forEach((record) => {
    records.push(record.get("n").properties);
  });
  session.close();
  driver.close();
  return records;
};

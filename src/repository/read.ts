import { Record } from "neo4j-driver";
import { Entity, database } from "../db/db";

export const findAll = async (entity?: Entity) => {
  const queryVar = entity ? `n:${entity}` : "(n)";
  const query = `MATCH (${queryVar}) RETURN n`;
  const result = await database.session.run(query);
  const records: Array<Record> = [];
  result.records.forEach((record) => {
    records.push(record.get("n").properties);
  });
  return records;
};

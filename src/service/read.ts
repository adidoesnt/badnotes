import { Record } from "neo4j-driver";
import { Entity } from "../db/db";
import { findAll as findAllRepo } from "../repository/read";

export const findAll = async (entity?: Entity) => {
  const param = entity?.toUpperCase();
  if (!!param && !Object.keys(Entity).includes(param as string))
    return [] as Record[];
  const result = await findAllRepo(param as Entity);
  return result;
};

import { Request, Response, NextFunction } from "express";
import { Entity } from "../db/db";
import { findAll as findAllService } from "../service/user";

export const findAll = async (request: Request, response: Response) => {
  const { query } = request;
  const { entity } = query;
  const result = await findAllService(entity as Entity);
  return response.status(200).json({
    result,
  });
};

import { Express, Request, Router, Response } from "express";
import { findAll } from "./controller/read";

export const initRoutes = (app: Express) => {
  const router = Router();
  router.get(
    "/all",
    async (request: Request, response: Response) =>
      await findAll(request, response)
  );
  app.use("/", router);
};

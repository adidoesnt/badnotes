import express from "express";
import { json, urlencoded } from "body-parser";
import { initRoutes } from "./routes";
import { findAll } from "./repository/read";

const { SERVER_PORT } = process.env;
const PORT = SERVER_PORT || 8080;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

initRoutes(app);

app.listen(PORT, () => {
  console.log(`badnotes server listening on port ${PORT}`);
});

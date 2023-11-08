import neo4j, { Driver, Session } from "neo4j-driver";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

export enum Entity {
  USER = "USER",
  NOTE = "NOTE",
}

class Neo4j {
  private static instance: Neo4j;
  driver: Driver;
  session: Session;

  private constructor() {
    this.driver = neo4j.driver(
      `bolt://${DB_HOST}:${DB_PORT}`,
      neo4j.auth.basic(`${DB_USERNAME}`, `${DB_PASSWORD}`)
    );
    this.session = this.driver.session();
  }

  public static getInstance() {
    if(!this.instance) {
      Neo4j.instance = new Neo4j();
    }
    return Neo4j.instance;
  }
}

export const database = Neo4j.getInstance();

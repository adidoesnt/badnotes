import Neode from "neode";
import { registerNoteModel, registerUserModel } from "neo4j/models";

const {
    NODE_ENV = "DEV",
    DB_HOST = "127.0.0.1",
    DB_PORT = "7687",
    DB_USERNAME = "neo4j",
    DB_PASSWORD = "password",
    DB_NAME = "neo4j",
} = process.env;

const DB_URI = `bolt://${DB_HOST}:${DB_PORT}`;

export const neode: Neode = new Neode(
    DB_URI,
    DB_USERNAME,
    DB_PASSWORD,
    false,
    DB_NAME,
    {
        debug: NODE_ENV === "DEV",
        encrypted: NODE_ENV === "DEV" ? "ENCRYPTION_OFF" : "ENCRYPTION_ON",
        trust:
            NODE_ENV === "DEV"
                ? "TRUST_ALL_CERTIFICATES"
                : "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
    },
);

export const registerModels = () => {
    registerUserModel(neode);
    registerNoteModel(neode);
};

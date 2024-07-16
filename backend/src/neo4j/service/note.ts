import { noteRepository } from "neo4j/repository";
import { relative } from "path";
import { Logger } from "utils";

const logger = new Logger({
    module: relative(process.cwd(), __filename),
});

export const getNotesByUser = async ({ username }: { username: string }) => {
    try {
        logger.debug("Getting notes by user", { username });
        const notes = await noteRepository.getUserNotes(username);
        return notes;
    } catch (e) {
        const error = e as Error;
        logger.error("Error getting notes by user", error);
    }
};

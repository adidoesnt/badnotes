import chalk, { type ChalkInstance } from "chalk";

const hello = chalk.blue;

enum Level {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

const LevelMap: Record<Level, ChalkInstance> = {
    INFO: chalk.green,
    WARN: chalk.yellow,
    ERROR: chalk.red,
    DEBUG: chalk.blue,
};

export class Logger {
    filePaths?: Record<Level, string | undefined>;

    constructor(filePaths?: Record<Level, string | undefined>) {
        this.filePaths = filePaths;
    }

    getMessage(level: Level, message: string, additional?: object): string {
        const now = new Date().toLocaleString();
        const formattedMessage = `[${now}] [${level}] ${message}`;
        return LevelMap[level](formattedMessage, JSON.stringify(additional));
    }

    info(message: string, additional?: object): void {
        console.log(this.getMessage(Level.INFO, message, additional));
    }

    warn(message: string, additional?: object): void {
        console.warn(this.getMessage(Level.WARN, message, additional));
    }

    error(message: string, additional?: object): void {
        console.error(this.getMessage(Level.ERROR, message, additional));
    }

    debug(message: string, additional?: object): void {
        console.debug(this.getMessage(Level.DEBUG, message, additional));
    }
}

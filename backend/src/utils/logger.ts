import fs from 'fs';
import path from 'path';

// Path to the log file
const logFilePath = path.join(__dirname, '../../logs/app.log');

// Ensure the directory for log files exists
const ensureLogDirectoryExists = () => {
    const logDir = path.dirname(logFilePath);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};

// Logger class for managing application logs
class Logger {
    /**
     * Writes a log message to the log file and console.
     * @param {string} message - The message to log.
     * @param {string} level - The log level (INFO, WARN, ERROR).
     * @private
     */
    private static log(message: string, level: string) {
        ensureLogDirectoryExists();
        const logMessage = `${new Date().toISOString()} [${level}] ${message}\n`;

        console.log(logMessage);

        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Failed to write log to file:', err);
            }
        });
    }

    /**
     * Logs an informational message.
     * @param {string} message - The informational message to log.
     */
    static info(message: string) {
        this.log(message, 'INFO');
    }

    /**
    * Logs a warning message.
    * @param {string} message - The warning message to log.
    */
    static warn(message: string) {
        this.log(message, 'WARN');
    }

    /**
     * Logs an error message.
     * @param {string} message - The error message to log.
     */
    static error(message: string) {
        this.log(message, 'ERROR');
    }
}

export default Logger;

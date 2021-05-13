import * as chalk from "chalk";

export default {

    info(message: string) {
        console.log(chalk.blue('INFO | ') + message);
    },

    warn(message: string) {
        console.log(chalk.yellow('WARN | ') + message);
    },

    error(message: string) {
        console.log(chalk.red('ERROR | ') + message);
    }


}
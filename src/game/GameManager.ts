import {Game} from "./Game";
import Log from "../util/Log";
import * as chalk from "chalk";
import Util from "../util/Util";

export class GameManager {

    private static instance: GameManager;

    public static getInstance(): GameManager
    {
        if (!this.instance)
            this.instance = new GameManager();

        return this.instance;
    }

    private games: Array<Game> = [];

    public start() {
        this.createGame();
    }

    public createGame(): Game {
        let code = Util.generateGameCode();

        while (this.games.some(game => game.id === code)) {
            code = Util.generateGameCode();
        }

        const game = new Game(code);
        this.games.push(game);
        Log.info(`Created game ${chalk.yellow(code)}`);

        return game;
    }

    public doesGameExist(code: string): boolean {
        return this.games.some(game => game.id === code);
    }

}
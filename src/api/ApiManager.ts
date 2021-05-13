import Log from "../util/Log";
import * as express from 'express';
import {Express, Request, Response, Router} from 'express';
import {Server} from "http";
import {SessionController} from "./controller/SessionController";
import {SocketManager} from "../socket/SocketManager";

export class ApiManager {

    private static instance: ApiManager;

    public static getInstance(): ApiManager {
        if (!this.instance)
            this.instance = new ApiManager();

        return this.instance;
    }

    private app: Express;

    public httpServer: Server;

    public start() {
        this.app = express();
        this.app.use(express.json());

        this.app.use((request: Request, response: Response, next) => {
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });

        this.httpServer = this.app.listen(process.env.PORT, () => {
            Log.info(`API available on port ${process.env.PORT}`);
            SocketManager.getInstance().start(); // only init socket manager if http server established
        });

        this.setupEndpoints();
    }

    private setupEndpoints() {
        const router = Router();

        router.use('/session', new SessionController().router);

        this.app.use('/api', router);
    }

}
import {Server, Socket} from "socket.io";
import Log from "../util/Log";
import {ApiManager} from "../api/ApiManager";
import {SessionManager} from "../session/SessionManager";

export class SocketManager {

    private static instance: SocketManager;
    private _server: Server;

    public static getInstance(): SocketManager {
        if (!SocketManager.instance)
            SocketManager.instance = new SocketManager();

        return this.instance;
    }

    public start() {
        const httpServer = ApiManager.getInstance().httpServer;
        this._server = new Server(httpServer, {
            cors: {
                origin: "http://localhost:3001",
                credentials: true
            },
            transports: ['websocket']
        });
        Log.info(`Web socket available on port ${process.env.PORT}`);

        this._server.on('connection', this.onConnection);
    }

    private onConnection(socket: Socket) {
        Log.info('Connection established');

        socket.on('request_session', async (callback) => {
            const session = await SessionManager.getInstance().createSession();
            callback(session.uuid);
        });

        socket.on('disconnect', reason => {
            Log.info(`Lost session. Reason: ${reason}`)
        });
    }

}
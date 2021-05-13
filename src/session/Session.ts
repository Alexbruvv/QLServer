import {ISession} from "./ISession";
import {Socket} from "socket.io";

export class Session implements ISession {

    public gameId: string | undefined;

    constructor(
        public uuid: string,
        public socket: Socket
    ) {
    }

}
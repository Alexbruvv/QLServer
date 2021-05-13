import {Client} from "socket.io/dist/client";

export class Player {

    public nickname: string;
    public client: Client<any, any>;

}
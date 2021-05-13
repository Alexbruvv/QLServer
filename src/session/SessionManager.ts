import {ISession} from "./ISession";
import {Session} from "./Session";
import {Socket} from "socket.io";
import {DatabaseManager} from "../database/DatabaseManager";

export class SessionManager {

    private static instance: SessionManager;

    public static getInstance(): SessionManager {
        if (!this.instance)
            this.instance = new SessionManager();

        return this.instance;
    }

    private activeSessions: Session[] = [];

    public async isSessionValid(id: string) {
        return this.activeSessions.some(session => session.uuid === id);
    }


    public async addSession(id: string, socket: Socket) {
        this.activeSessions.push(new Session(id, socket));
    }

    public async removeSessionBySocket(socket: Socket) {
        this.activeSessions.forEach((session, index) => {
            if (session.socket === socket)
                this.activeSessions.splice(index, 1);
        });
    }

    public async createSession(): Promise<ISession> {
        let session: ISession = undefined;
        const client = await DatabaseManager.getInstance().pool.connect();
        const res = await client.query<ISession>('INSERT INTO sessions (uuid) VALUES (uuid_generate_v4()) RETURNING uuid');

        if (res.rows.length === 0) {
            client.release();
            throw new Error('Failed to create session');
        }

        session = res.rows[0];
        client.release();

        return session;
    }

    public async getSession(id: string): Promise<ISession | undefined> {
        const client = await DatabaseManager.getInstance().pool.connect();
        const res = await client.query<ISession>('SELECT createdAt, gameId FROM sessions WHERE uuid = $1', [id]);

        if (res.rows.length === 0)
            return undefined;

        const session = res.rows[0];
        client.release();

        return session;
    }

    public async deleteSession(id: string) {
        const client = await DatabaseManager.getInstance().pool.connect();
        await client.query('DELETE FROM sessions WHERE uuid = $1', [id]);
        client.release();

        return id;
    }

}
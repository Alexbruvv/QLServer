import {Pool} from "pg";
import Log from "../util/Log";

export class DatabaseManager {

    private static instance: DatabaseManager;

    public static getInstance() {
        if (!DatabaseManager.instance)
            this.instance = new DatabaseManager();

        return this.instance;
    }

    public pool: Pool;

    public start() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATBASE,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT),
            idleTimeoutMillis: 0,
            connectionTimeoutMillis: 0
        });

        this.pool.on('error', (err, client) => {
            Log.error('Database client error: ' + err.message);
        });
    }

}
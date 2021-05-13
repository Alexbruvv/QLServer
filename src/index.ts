import * as dotenv from 'dotenv';
import {DatabaseManager} from "./database/DatabaseManager";
import {ApiManager} from "./api/ApiManager";
import {GameManager} from "./game/GameManager";
import Log from "./util/Log";

dotenv.config();

async function init() {
    await DatabaseManager.getInstance().start();
    await ApiManager.getInstance().start();
    await GameManager.getInstance().start();
}

init().catch(err => {
    Log.error('Failed to initialise')
    console.log(err);
})



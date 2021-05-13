import {Request, Response} from "express";
import {Controller} from "./Controller";
import {GameManager} from "../../game/GameManager";
import * as assert from "assert";
import {SessionManager} from "../../session/SessionManager";

export class SessionController extends Controller {

    constructor() {
        super();

        this.router.post('/checkGameCode', SessionController.checkGameCode);
        this.router.post('/checkSession', SessionController.checkGameCode);
    }

    private static async checkGameCode(request: Request, response: Response) {
        const code = request.body.code;

        if (code === undefined) {
            return response.status(400).json({
                success: false,
                message: 'Invalid request'
            });
        }

        return response.status(200).json({
            success: true,
            valid: GameManager.getInstance().doesGameExist(code)
        });
    }

    private static async checkSession(request: Request, response: Response) {
        const uuid = request.body.uuid;

        if (uuid === undefined) {
            return response.status(400).json({
                success: false,
                message: 'Invalid request'
            });
        }

        return response.status(200).json({
            success: true,
            valid: SessionManager.getInstance().isSessionValid(uuid)
        })
    }

}
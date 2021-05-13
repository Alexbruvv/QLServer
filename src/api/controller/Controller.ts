import {Router} from "express";

export abstract class Controller {

    public router: Router;

    protected constructor() {
        this.router = Router();
    }

}
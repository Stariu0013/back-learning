import {Request, Response, Router} from "express";
import {db} from "../db";
import {HttpStatuses} from "../core/types/http-statuses";

export const testingRouter = Router({});

testingRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    db.drivers = [];

    res.sendStatus(HttpStatuses.NO_CONTENT);
});
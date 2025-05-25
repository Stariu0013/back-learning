import express, {Express, Request, Response} from "express";
import {driverRouter} from "./driver/router/router.driver";
import {testingRouter} from "./testing/router.testing";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response)=>{
        res.json({
            message: 'Hello World'
        })
    });

    app.use('/drivers', driverRouter);
    app.use('/testing', testingRouter)

    return app;
};
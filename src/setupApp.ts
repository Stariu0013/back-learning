import express, {Express, Request, Response} from "express";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response)=>{
        res.json({
            message: 'Hello World!!!!!'
        })
    })

    return app;
};
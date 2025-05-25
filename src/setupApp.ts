import express, {Express, Request, Response} from "express";
import { db } from "./db";
import {HttpStatuses} from "./core/types/http-statuses";
import { Driver } from "./driver/types/driver";
import {vehicleInputDtoValidation} from "./driver/validation/vehicleInputDtoValidation";
import {createErrorMessage} from "./core/utils/error.utils";
import {ValidationError} from "./driver/types/validationError";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response)=>{
        res.json({
            message: 'Hello World'
        })
    });
    app.get('/drivers', (req: Request, res: Response)=> {
        res.status(HttpStatuses.OK).send(db.drivers);
    });
    app.get('/drivers/:id', (req: Request<{id: string}, Driver, {}, {}>, res: Response<Driver | {message: string}>)=> {
        const {id} = req.params;

        const user: Driver | undefined = db.drivers.find(u => u.id === +id);

        if (user) {
            res.status(HttpStatuses.OK).send(user);
        } else {
            res.status(HttpStatuses.NOT_FOUND).send({
                message: 'User not found'
            });
        }
    });

    app.post('/drivers', (req: Request<{}, Driver, Driver, {}>, res: Response<Driver | { errorMessages: ValidationError[] }>)=> {
        const errors = vehicleInputDtoValidation(req.body);

        if (errors.length > 0) {
            res.status(HttpStatuses.BAD_REQUEST).send(createErrorMessage(errors));

            return;
        }

        const driver: Driver = {
            id: (db.drivers[db.drivers.length - 1]?.id || 0) + 1,
            email: req.body.email,
            name: req.body.name,
            createdAt: new Date(),
            phoneNumber: req.body.phoneNumber,
            vehicleDescription: req.body.vehicleDescription,
            vehicleFeatures: req.body.vehicleFeatures,
            vehicleLicensePlate: req.body.vehicleLicensePlate,
            vehicleMake: req.body.vehicleMake,
            vehicleModel: req.body.vehicleModel,
            vehicleYear: req.body.vehicleYear
        };

        db.drivers.push(driver);
        res.status(HttpStatuses.CREATED).send(driver);
    });

    app.delete('/testing/all-data', (req: Request, res: Response) => {
        db.drivers = [];

        res.sendStatus(HttpStatuses.NO_CONTENT);
    });

    return app;
};
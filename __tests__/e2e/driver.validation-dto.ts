import request from "supertest";
import {Driver, VehicleFeatures} from "../../src/driver/types/driver";
import express from "express";
import {setupApp} from "../../src/setupApp";
import {HttpStatuses} from "../../src/core/types/http-statuses";
import {ValidationError} from "../../src/driver/types/validationError";

describe('Driver validation', () => {
    const app = express();
    setupApp(app);

    const testDriverData: Driver = {
        'vehicleYear': 2001,
        'vehicleModel': 'Supra',
        "vehicleMake": 'Toyota',
        'vehicleLicensePlate': 'AA000BB',
        'vehicleFeatures': [
            VehicleFeatures.ChildSeat,
            VehicleFeatures.WiFi,
            VehicleFeatures.PetFriendly
        ],
        'vehicleDescription': `It's a SUPRAAAA`,
        'phoneNumber': 380980000000,
        'name': 'Vladyslav',
        'email': 'test@gmail.com',
    };

    beforeEach(() => {
        request(app).delete('/testing/all-data').expect(HttpStatuses.NO_CONTENT)
    })

    it('should return errors with spaces if fields', async () => {
        const newDriver = {
            ...testDriverData,
            'email': '   ',
            'name': '   ',
            'phoneNumber': '380980000000',
            'vehicleDescription': '   ',
        };

        const response = await request(app).post('/drivers').send(newDriver);

        expect(response.status).toBe(HttpStatuses.BAD_REQUEST);
        expect(response.body.errorMessages.length).toBe(4);
    });

    it('should return errors with no spaces if fields', async () => {
        const newDriver = {
            ...testDriverData,
            'email': '',
            'name': '',
            'phoneNumber': '',
            'vehicleDescription': '',
        };

        const response = await request(app).post('/drivers').send(newDriver);

        expect(response.status).toBe(HttpStatuses.BAD_REQUEST);
        expect(response.body.errorMessages.length).toBe(4);
    });

    it ('should validate email', async () => {
        const newDriver = {
            ...testDriverData,
            'email': 'test',
        };

        const response = await request(app).post('/drivers').send(newDriver);

        expect(response.status).toBe(HttpStatuses.BAD_REQUEST);
        expect(response.body.errorMessages.length).toBe(1);
    });

    it('vehicle features are valid', async () => {
        const newDriver = {
            ...testDriverData,
            'vehicleFeatures': [
                VehicleFeatures.ChildSeat,
                VehicleFeatures.PetFriendly,
                VehicleFeatures.WiFi
            ],
        };

        const response = await request(app).post('/drivers').send(newDriver);

        expect(response.status).toBe(HttpStatuses.CREATED);
        expect(response.body).toEqual({
            ...newDriver,
            createdAt: expect.any(String),
            id: expect.any(Number)
        });
    });
    it('vehicle features are not valid', async () => {
        const newDriver = {
            ...testDriverData,
            'vehicleFeatures': [
                'test'
            ],
        };

        const response = await request(app).post('/drivers').send(newDriver);

        const expectedErrorMessage: ValidationError = {
            field: 'vehicleFeatures',
            message: 'Invalid vehicleFeatures test',
        }

        expect(response.status).toBe(HttpStatuses.BAD_REQUEST);
        expect(response.body.errorMessages[0]).toEqual(expectedErrorMessage);
    })
});
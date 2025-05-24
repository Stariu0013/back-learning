import request from "supertest";
import express from "express";
import {setupApp} from "../../src/setupApp";
import {Driver, VehicleFeatures} from "../../src/driver/types/driver";
import {HttpStatuses} from "../../src/core/types/http-statuses";

describe('Drivers API', () => {
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

    beforeEach(async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatuses.NO_CONTENT);
    });

    it('should return hello world', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(HttpStatuses.OK);
    });

    it('should return drivers list(empty)', async () => {
        await request(app).get('/drivers').expect(HttpStatuses.OK);
    });

    it('create driver', async () => {
        await request(app).post('/drivers').send(testDriverData).expect(HttpStatuses.CREATED);
    });

    it('should return drivers list', async () => {
        await request(app).post('/drivers').send({
            ...testDriverData,
            name: 'Vasya'
        }).expect(HttpStatuses.CREATED);
        await request(app).post('/drivers').send({
            ...testDriverData,
            name: 'Petya'
        }).expect(HttpStatuses.CREATED);
        await request(app).post('/drivers').send({
            ...testDriverData,
            name: 'Masha'
        }).expect(HttpStatuses.CREATED);

        const drivers = await request(app).get('/drivers');

        expect(drivers.body).toBeInstanceOf(Array);
        expect(drivers.body.length).toBe(3);
    });

    it('should return driver by id', async () => {
        await request(app).post('/drivers').send({
            ...testDriverData,
            name: 'Vasya'
        }).expect(HttpStatuses.CREATED);
        await request(app).post('/drivers').send(testDriverData).expect(HttpStatuses.CREATED);

        const TARGET_ID = 2;
        const user = await request(app).get(`/drivers/${TARGET_ID}`);

        expect(user.status).toBe(HttpStatuses.OK);
        expect(user.body).toEqual({
            ...testDriverData,
            id: TARGET_ID,
            createdAt: expect.any(String)
        })
    });
});

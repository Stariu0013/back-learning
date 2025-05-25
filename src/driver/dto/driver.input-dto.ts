import {VehicleFeatures} from "../types/driver";

export type DriverInputDto = {
    name: string;
    phoneNumber: number;
    email: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: number;
    vehicleLicensePlate: string;
    vehicleDescription: string | null;
    vehicleFeatures: VehicleFeatures[];
};
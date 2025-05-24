export enum VehicleFeatures {
    WiFi = 'wi-fi',
    ChildSeat = 'child-seat',
    PetFriendly = 'pet-friendly',
}

export type Driver = {
    id?: number;
    name: string;
    phoneNumber: number;
    email: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: number;
    vehicleLicensePlate: string;
    vehicleDescription: string | null;
    vehicleFeatures: VehicleFeatures[];
    createdAt?: Date;
}
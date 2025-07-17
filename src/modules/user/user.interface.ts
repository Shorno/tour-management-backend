import {Types} from "mongoose";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: Role;
    phone?: string;
    photoUrl?: string;
    address?: string;
    isDeleted?: boolean;
    isVerified?: boolean;
    isActive: IsActive;
    auths: AuthProvider[]
    bookings?: Types.ObjectId[];
    guids?: Types.ObjectId[]
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    SUPERADMIN = "SUPERADMIN",
    GUIDE = "GUIDE",
}

export interface AuthProvider {
    provider: "google" | "credentials";
    providerId: string;
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
}
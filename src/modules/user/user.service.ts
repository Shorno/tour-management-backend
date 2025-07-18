import {IUser, Role} from "./user.interface";
import {User} from "./user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import {JwtPayload} from "jsonwebtoken";

export const createUserService = async (payload: Partial<IUser>) => {
    const {name, email, password} = payload;


    if (!name || !email || !password) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Name, email, and password are required fields.')
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User already exists with this email address.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const authProvider = {
        provider: 'credentials',
        providerId: email
    }


    return await User.create({name, email, password: hashedPassword, auths: [authProvider]});

}


export const getAllUsersService = async () => {
    const users = await User.find();

    const totalUsers = await User.countDocuments();

    return {
        data: users,
        metadata: {
            total: totalUsers
        }
    }
}


export const updateUserService = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
    }

    if (payload.role) {
        if (decodedToken.role === Role.ADMIN || decodedToken.role === Role.GUIDE || decodedToken.role === Role.USER) {
            throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized action.');
        }

        if (payload.role === Role.ADMIN && decodedToken.role == Role.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized action.');
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isActive) {
        if (decodedToken.role == Role.USER || decodedToken.role == Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are not allowed to change user status.');
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10)
    }


    return User.findByIdAndUpdate(userId, payload, {new: true});

}


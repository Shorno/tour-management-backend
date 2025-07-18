import {IUser} from "../user/user.interface";
import {User} from "../user/user.model";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcryptjs";
import {generateToken} from "../../utils/jwt";
import {env} from "../../utils/env";

export const credentialsLoginService = async (payload: Partial<IUser>) => {
    const {email, password} = payload;

    if (!email || !password) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Email and password are required fields.');
    }

    const existingUser = await User.findOne({email});

    if (!existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist with this email address.');
    }

    if (!existingUser.password) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials. Please try again.");
    }


    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials. Please try again.');
    }

    const jwtPayload = {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role
    }

    const accessToken = generateToken(jwtPayload, env.JWT_SECRET, env.JWT_EXPIRES_IN);


    return {
        email: existingUser.email,
        accessToken,
    }


}
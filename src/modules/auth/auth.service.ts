import {IUser} from "../user/user.interface";
import {User} from "../user/user.model";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcryptjs";
import {createNewAccessTokenWithRefreshToken, createUserTokens} from "../../utils/userToken";


export const credentialsLoginService = async (payload: Partial<IUser>) => {
    const {email, password} = payload;

    if (!email || !password) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Email and password are required fields.');
    }

    const existingUser = await User.findOne({email}).select('+password');

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

    const userObject = existingUser.toObject();
    delete userObject.password;

    const userTokens = createUserTokens(existingUser)

    return {
        user: userObject,
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken
    }
}


export const getNewAccessTokenService = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return {
        accessToken: newAccessToken
    }
}
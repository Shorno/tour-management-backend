import {IUser} from "./user.interface";
import {User} from "./user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const createUserService = async (payload: Partial<IUser>) => {
    const {name, email, password} = payload;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User already exists with this email address.')
    }

    if (!name || !email || !password) {
        return {error: 'All fields are required', status: 400};
    }

    const authProvider = {
        provider: 'credentials',
        providerId: email
    }


    return await User.create({name, email, auths: [authProvider]});

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

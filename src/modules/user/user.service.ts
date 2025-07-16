import {IUser} from "./user.interface";
import {User} from "./user.model";

export const createUserService = async (payload: Partial<IUser>) => {
    const {name, email} = payload;

    if (!name || !email) {
        return {error: 'All fields are required', status: 400};
    }

    return await User.create({name, email});

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
